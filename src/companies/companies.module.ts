import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company } from './company.entity'
import { CompaniesService } from './companies.service'
import { CompaniesController } from './companies.controller'
import { CompaniesRepository } from './companies.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompaniesService, CompaniesRepository],
  exports: [CompaniesService, CompaniesRepository],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
