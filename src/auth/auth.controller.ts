import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Request,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { Public } from './decorators/public.decorator'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { GetUser } from '@/common/decorators/user.decorator'
import { User } from '@/users'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { access_token } = await this.authService.signup(createUserDto)
    response.cookie('jwt', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    return { message: 'Successfully signed up' }
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: any,
    @Res({ passthrough: true }) response: Response
  ) {
    const { access_token } = await this.authService.login(req.user)
    response.cookie('jwt', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    return { message: 'Successfully logged in', isAdmin: req.user.isAdmin }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt')
    return { message: 'Successfully logged out' }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@GetUser() user: User) {
    return user
  }

  @Public()
  @Get('validate')
  async validateUserData(
    @Query('documentNumber') documentNumber?: string,
    @Query('email') email?: string
  ) {
    if (!documentNumber && !email) {
      throw new BadRequestException('Email or document number is required')
    }

    const isAvailable = await this.authService.validateUserData(
      documentNumber,
      email
    )
    if (!isAvailable) {
      throw new BadRequestException('User already exists')
    }
    return { isAvailable }
  }
}
