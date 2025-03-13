import { User } from '@/users';
import { DebtType, DebtEntity } from './enum/type.enum';
export declare class Debt {
    id: string;
    type: DebtType;
    otherType: string;
    entity: DebtEntity;
    otherEntity: string;
    amount: number;
    guarantee: boolean;
    description: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
