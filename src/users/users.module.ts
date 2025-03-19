import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './user.entity'
import { UsersRepository } from './users.repository'
import { DebtsRepository } from '@/debts/debts.repository'
import { NegotiationsRepository } from '@/negotiations/negotiations.repository'
import { Negotiation } from '@/negotiations/negotiation.entity'
import { Debt } from '@/debts/debt.entity'
import { ResendModule } from '@/utils/resend.module'

@Module({
  imports: [TypeOrmModule.forFeature([User, Debt, Negotiation]), ResendModule],
  providers: [
    UsersService,
    UsersRepository,
    DebtsRepository,
    NegotiationsRepository,
  ],
  controllers: [UsersController],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
