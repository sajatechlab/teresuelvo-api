import { Repository } from 'typeorm';
import { Negotiation } from './negotiation.entity';
import { NegotiationStatus } from './enum/status.enum';
export declare class NegotiationsRepository {
    private repository;
    constructor(repository: Repository<Negotiation>);
    create(debtId: string): Negotiation;
    save(negotiation: Negotiation): Promise<Negotiation>;
    findOne(where: any): Promise<Negotiation | null>;
    findByDebt(debtId: string): Promise<Negotiation | null>;
    getTotalAmountSaved(userId: string): Promise<any>;
    getPendingPaymentsCount(userId: string): Promise<number>;
    getNegotiationMetrics(userId: string): Promise<{
        totalSaved: number;
        pendingPayments: number;
        activeNegotiations: number;
        pendingPaymentAmount: number;
    }>;
    findAll(userId: string): Promise<Negotiation[]>;
    getNegotiationPageMetrics(userId: string): Promise<{
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
