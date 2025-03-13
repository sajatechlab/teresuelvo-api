"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NegotiationsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const negotiation_entity_1 = require("./negotiation.entity");
let NegotiationsRepository = class NegotiationsRepository {
    constructor(repository) {
        this.repository = repository;
    }
    create(debtId) {
        const negotiation = this.repository.create({ debt: { id: debtId } });
        this.repository.save(negotiation);
        return negotiation;
    }
    save(negotiation) {
        return this.repository.save(negotiation);
    }
    findOne(where) {
        return this.repository.findOne({ where });
    }
    findByDebt(debtId) {
        return this.repository.findOne({ where: { debt: { id: debtId } } });
    }
    async getTotalAmountSaved(userId) {
        return this.repository
            .createQueryBuilder('negotiation')
            .innerJoin('negotiation.debt', 'debt')
            .where('debt.userId = :userId', { userId })
            .select('SUM(debt.amount - negotiation.amountNegotiated)', 'totalSaved')
            .getRawOne();
    }
    async getPendingPaymentsCount(userId) {
        return this.repository
            .createQueryBuilder('negotiation')
            .innerJoin('negotiation.debt', 'debt')
            .where('debt.userId = :userId', { userId })
            .andWhere('negotiation.status = :status', { status: 'PENDING_PAYMENT' })
            .getCount();
    }
    async getNegotiationMetrics(userId) {
        const [totalSaved, pendingPayments, activeNegotiations, pendingPaymentAmount,] = await Promise.all([
            this.repository
                .createQueryBuilder('negotiation')
                .innerJoin('negotiation.debt', 'debt')
                .where('debt.userId = :userId', { userId })
                .select('SUM(debt.amount - negotiation.amountNegotiated)', 'totalSaved')
                .getRawOne(),
            this.repository
                .createQueryBuilder('negotiation')
                .innerJoin('negotiation.debt', 'debt')
                .where('debt.userId = :userId', { userId })
                .andWhere('negotiation.status = :status', {
                status: 'PENDING_PAYMENT',
            })
                .getCount(),
            this.repository
                .createQueryBuilder('negotiation')
                .innerJoin('negotiation.debt', 'debt')
                .where('debt.userId = :userId', { userId })
                .andWhere('negotiation.status IN (:...statuses)', {
                statuses: ['PENDING_REVISION', 'IN_NEGOTIATION'],
            })
                .getCount(),
            this.repository
                .createQueryBuilder('negotiation')
                .innerJoin('negotiation.debt', 'debt')
                .where('debt.userId = :userId', { userId })
                .andWhere('negotiation.status = :status', {
                status: 'PENDING_PAYMENT',
            })
                .select('SUM(negotiation.amountNegotiated)', 'pendingPaymentAmount')
                .getRawOne(),
        ]);
        return {
            totalSaved: Number(totalSaved?.totalSaved) || 0,
            pendingPayments,
            activeNegotiations,
            pendingPaymentAmount: Number(pendingPaymentAmount?.pendingPaymentAmount) || 0,
        };
    }
    async findAll(userId) {
        return this.repository
            .createQueryBuilder('negotiation')
            .innerJoinAndSelect('negotiation.debt', 'debt')
            .where('debt.userId = :userId', { userId })
            .getMany();
    }
    async getNegotiationPageMetrics(userId) {
        const metrics = await this.repository
            .createQueryBuilder('negotiation')
            .innerJoin('negotiation.debt', 'debt')
            .where('debt.userId = :userId', { userId })
            .select([
            'COUNT(CASE WHEN negotiation.status IN (:...inNegotiationStatuses) THEN 1 END)::int AS "inNegotiationCount"',
            'COALESCE(SUM(CASE WHEN negotiation.status IN (:...inNegotiationStatuses) THEN debt.amount  END), 0)::decimal AS "inNegotiationTotal"',
            'COUNT(CASE WHEN negotiation.status = :paidStatus THEN 1 END)::int AS "paidCount"',
            'COALESCE(SUM(CASE WHEN negotiation.status = :paidStatus THEN negotiation.amountNegotiated END), 0)::decimal AS "paidTotal"',
            'COALESCE(SUM(CASE WHEN negotiation.status = :paidStatus THEN debt.amount END), 0)::decimal AS "originalAmountPaid"',
            'COUNT(CASE WHEN negotiation.status = :pendingPaymentStatus THEN 1 END)::int AS "pendingPaymentCount"',
            'COALESCE(SUM(CASE WHEN negotiation.status = :pendingPaymentStatus THEN negotiation.amountNegotiated END), 0)::decimal AS "pendingPaymentTotal"',
        ])
            .setParameters({
            inNegotiationStatuses: ['PENDING_REVISION', 'IN_NEGOTIATION'],
            paidStatus: 'PAID',
            pendingPaymentStatus: 'PENDING_PAYMENT',
        })
            .getRawOne();
        return {
            inNegotiationCount: parseInt(metrics.inNegotiationCount) || 0,
            inNegotiationTotal: parseFloat(metrics.inNegotiationTotal) || 0,
            paidCount: parseInt(metrics.paidCount) || 0,
            paidTotal: parseFloat(metrics.paidTotal) || 0,
            originalAmountPaid: parseFloat(metrics.originalAmountPaid) || 0,
            pendingPaymentCount: parseInt(metrics.pendingPaymentCount) || 0,
            pendingPaymentTotal: parseFloat(metrics.pendingPaymentTotal) || 0,
        };
    }
    updateStatus(id, status) {
        return this.repository.update(id, { status });
    }
};
exports.NegotiationsRepository = NegotiationsRepository;
exports.NegotiationsRepository = NegotiationsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(negotiation_entity_1.Negotiation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NegotiationsRepository);
//# sourceMappingURL=negotiations.repository.js.map