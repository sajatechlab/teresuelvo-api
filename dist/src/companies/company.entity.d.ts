import { User } from '@/users';
import { CompanyType, CompanyDocumentType } from './enum/type.enum';
import { DebtRange } from '@/debts/enum/type.enum';
export declare class Company {
    id: string;
    type: CompanyType;
    documentType: CompanyDocumentType;
    documentNumber: string;
    debtApprox: DebtRange;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
