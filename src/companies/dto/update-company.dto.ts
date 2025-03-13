import { IsOptional, IsEnum, IsString } from 'class-validator'
import { CompanyType, CompanyDocumentType } from '../enum/type.enum'
export class UpdateCompanyDto {
  @IsOptional()
  @IsEnum(CompanyType)
  type?: CompanyType

  @IsOptional()
  @IsEnum(CompanyDocumentType)
  documentType?: CompanyDocumentType

  @IsOptional()
  @IsString()
  documentNumber?: string

  @IsOptional()
  debtApprox?: string // Assuming this is a string representation of the debt range
}
