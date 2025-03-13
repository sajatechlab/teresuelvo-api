import { CompanyType, CompanyDocumentType } from '../enum/type.enum';
export declare class UpdateCompanyDto {
    type?: CompanyType;
    documentType?: CompanyDocumentType;
    documentNumber?: string;
    debtApprox?: string;
}
