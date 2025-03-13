import { IsOptional, IsNumber, IsEnum } from 'class-validator'
import { NegotiationStatus } from '../enum/status.enum'
export class UpdateNegotiationDto {
  @IsOptional()
  @IsNumber()
  amountNegotiated?: number

  @IsOptional()
  @IsEnum(NegotiationStatus)
  status?: NegotiationStatus
}
