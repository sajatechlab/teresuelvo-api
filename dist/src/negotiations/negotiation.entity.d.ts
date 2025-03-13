import { Debt } from '@/debts/debt.entity';
import { NegotiationStatus } from './enum/status.enum';
export declare class Negotiation {
    id: string;
    amountNegotiated: number;
    status: NegotiationStatus;
    debt: Debt;
    createdAt: Date;
    updatedAt: Date;
}
