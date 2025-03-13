import { IsEnum, IsString, IsNotEmpty } from 'class-validator'
import { CompanyType, CompanyDocumentType } from '../enum/type.enum'
import { DebtRange } from '@/debts/enum/type.enum'
export class CreateCompanyDto {
  @IsEnum(CompanyType)
  type: CompanyType

  @IsEnum(CompanyDocumentType)
  documentType: CompanyDocumentType

  @IsNotEmpty()
  @IsString()
  documentNumber: string

  @IsNotEmpty()
  @IsEnum(DebtRange)
  debtApprox: DebtRange // Assuming this is a string representation of the debt range
}
