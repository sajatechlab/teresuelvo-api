import { DebtEntity, DebtType } from '../enum/type.enum';
export declare class CreateDebtDto {
    type: DebtType;
    otherType?: string;
    entity: DebtEntity;
    otherEntity?: string;
    amount: number;
    guarantee: boolean;
    description?: string;
}
