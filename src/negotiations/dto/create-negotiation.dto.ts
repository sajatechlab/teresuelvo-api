import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator'
import { NegotiationStatus } from '../enum/status.enum'
export class CreateNegotiationDto {
  @IsNotEmpty()
  debtId: string // Assuming this is a UUID
}
