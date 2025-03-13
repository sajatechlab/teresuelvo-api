import { CompanyType, CompanyDocumentType } from '../enum/type.enum';
import { DebtRange } from '@/debts/enum/type.enum';
export declare class CreateCompanyDto {
    type: CompanyType;
    documentType: CompanyDocumentType;
    documentNumber: string;
    debtApprox: DebtRange;
}
