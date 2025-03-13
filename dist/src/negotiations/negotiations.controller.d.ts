import { NegotiationsService } from './negotiations.service';
import { User } from '@/users';
import { NegotiationStatus } from './enum/status.enum';
export declare class NegotiationsController {
    private readonly negotiationsService;
    constructor(negotiationsService: NegotiationsService);
    create(debtId: string): Promise<import("./negotiation.entity").Negotiation>;
    updateStatus(id: string, status: NegotiationStatus): Promise<import("typeorm").UpdateResult>;
    findAll(user: User): Promise<import("./negotiation.entity").Negotiation[]>;
    getNegotiationMetrics(user: User): Promise<{
        inNegotiationCount: number;
        inNegotiationTotal: number;
        paidCount: number;
        paidTotal: number;
        originalAmountPaid: number;
        pendingPaymentCount: number;
        pendingPaymentTotal: number;
    }>;
}
