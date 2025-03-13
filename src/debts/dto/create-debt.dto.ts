import {
  IsEnum,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  ValidateIf,
  IsBoolean,
} from 'class-validator'
import { DebtEntity, DebtType } from '../enum/type.enum'

export class CreateDebtDto {
  @IsEnum(DebtType)
  type: DebtType

  @ValidateIf((o) => o.type === DebtType.OTHER)
  @IsString()
  otherType?: string

  @IsEnum(DebtEntity)
  entity: DebtEntity

  @ValidateIf((o) => o.entity === DebtEntity.OTHER)
  @IsString()
  otherEntity?: string

  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsNotEmpty()
  @IsBoolean()
  guarantee: boolean

  @IsOptional()
  @IsString()
  description?: string
}
