import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Negotiation } from './negotiation.entity'
import { NegotiationsService } from './negotiations.service'
import { NegotiationsController } from './negotiations.controller'
import { NegotiationsRepository } from './negotiations.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Negotiation])],
  providers: [NegotiationsService, NegotiationsRepository],
  exports: [NegotiationsService, NegotiationsRepository],
  controllers: [NegotiationsController],
})
export class NegotiationsModule {}
