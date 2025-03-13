import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Debt } from './debt.entity'
import { DebtsService } from './debts.service'
import { DebtsController } from './debts.controller'
import { DebtsRepository } from './debts.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Debt])],
  providers: [DebtsService, DebtsRepository],
  exports: [DebtsService, DebtsRepository],
  controllers: [DebtsController],
})
export class DebtsModule {}
