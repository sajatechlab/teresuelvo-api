import { NegotiationsRepository } from './negotiations.repository';
import { NegotiationStatus } from './enum/status.enum';
export declare class NegotiationsService {
    private negotiationsRepository;
    constructor(negotiationsRepository: NegotiationsRepository);
    create(debtId: string): Promise<import("./negotiation.entity").Negotiation>;
    findOne(id: string): Promise<import("./negotiation.entity").Negotiation | null>;
    findAll(userId: string): Promise<import("./negotiation.entity").Negotiation[]>;
    getNegotiationMetrics(userId: string): Promise<{
        inNegotiationCount: number;
        inNegotiationTotal: number;
        paidCount: number;
        paidTotal: number;
        originalAmountPaid: number;
        pendingPaymentCount: number;
        pendingPaymentTotal: number;
    }>;
    updateStatus(id: string, status: NegotiationStatus): Promise<import("typeorm").UpdateResult>;
}
