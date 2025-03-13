import { Injectable, ConflictException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcryptjs'
import { UsersService, CreateUserDto, UsersRepository } from '../users'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private usersRepository: UsersRepository
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email)

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async signup(createUserDto: CreateUserDto) {
    // Check if user exists
    const existingUser = await this.usersService.findOne(createUserDto.email)
    if (existingUser) {
      throw new ConflictException('Email already exists')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    // Create new user with hashed password
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    })

    const payload = { email: user.email, sub: user.id }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async validateUserData(
    documentNumber?: string,
    email?: string
  ): Promise<boolean> {
    const query = []

    if (email) {
      query.push({ email })
    }
    if (documentNumber) {
      query.push({ documentNumber })
    }

    const existingUser = await this.usersRepository.findOne(query)

    return !existingUser
  }
}
