import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import * as bcrypt from 'bcryptjs'
import { UsersRepository } from './users.repository'
import { CreateUserDto } from './dto/create-user.dto'
import { DebtsRepository } from '@/debts/debts.repository'
import { NegotiationsRepository } from '@/negotiations/negotiations.repository'
import { DashboardMetrics } from './interfaces/dashboard-metrics.interface'
import { UpdateUserDto } from './dto/update-user.dto'
import { startOfMonth, subMonths } from 'date-fns'
import { ContactUsDto } from './dto/contact-us.dto'
import { ResendService } from '../utils/resend'
@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private debtsRepository: DebtsRepository,
    private negotiationsRepository: NegotiationsRepository,
    private resendService: ResendService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto)
    return this.usersRepository.save(user)
  }

  findOne(email: string) {
    return this.usersRepository.findOne({ email })
  }

  async getDashboardMetrics(userId: string): Promise<DashboardMetrics> {
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const [debtMetrics, negotiationMetrics] = await Promise.all([
      this.debtsRepository.getDebtMetrics(userId, sixMonthsAgo),
      this.negotiationsRepository.getNegotiationMetrics(userId),
    ])

    const metrics: DashboardMetrics = {
      debtsPerEntity: debtMetrics.perEntity || [],
      totalAmountSaved: negotiationMetrics.totalSaved || 0,
      pendingPayments: negotiationMetrics.pendingPayments || 0,
      debtsPerMonth: debtMetrics.perMonth || [],
      debtsPerType: debtMetrics.perType || [],
      totalDebtAmount: debtMetrics.totalAmount?.totalAmount || 0,
      activeNegotiations: negotiationMetrics.activeNegotiations || 0,
      pendingPaymentsAmount: negotiationMetrics.pendingPaymentAmount || 0,
    }

    return metrics
  }

  async getAdminMetrics() {
    const startOfCurrentMonth = startOfMonth(new Date())
    const sixMonthsAgo = subMonths(new Date(), 6)

    const [userMetrics, debtMetrics, negotiationMetrics] = await Promise.all([
      this.usersRepository.getAdminMetrics(startOfCurrentMonth),
      this.debtsRepository.getAdminMetrics(sixMonthsAgo),
      this.negotiationsRepository.getAdminMetrics(sixMonthsAgo),
    ])

    return {
      userMetrics,
      debtMetrics,
      negotiationMetrics,
    }
  }

  async getUsers() {
    return this.usersRepository.findAll()
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ id })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    await this.usersRepository.update(id, updateUserDto)
    return this.usersRepository.findOne({ id })
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({ id })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    await this.usersRepository.softDelete(id)
    return { message: 'User deleted successfully' }
  }

  async findOneById(id: string) {
    const user = await this.usersRepository.findOneById(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    console.log('user', user)
    return user
  }

  async contactUs(contactUsDto: ContactUsDto) {
    return this.resendService.sendContactEmails(contactUsDto)
  }
}
