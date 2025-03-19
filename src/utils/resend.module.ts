import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ResendService } from './resend'

@Module({
  imports: [ConfigModule],
  providers: [ResendService],
  exports: [ResendService],
})
export class ResendModule {}
