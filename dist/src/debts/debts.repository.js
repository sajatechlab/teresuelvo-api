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
exports.DebtsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const debt_entity_1 = require("./debt.entity");
let DebtsRepository = class DebtsRepository {
    constructor(repository) {
        this.repository = repository;
    }
    create(data) {
        return this.repository.create(data);
    }
    save(debt) {
        return this.repository.save(debt);
    }
    findOne(id) {
        return this.repository.findOne({ where: { id } });
    }
    findByUser(userId) {
        return this.repository.find({ where: { user: { id: userId } } });
    }
    findAllNotNegotiated(userId) {
        return this.repository
            .createQueryBuilder('debt')
            .where('debt.userId = :userId', { userId })
            .andWhere('debt.id NOT IN (SELECT negotiation."debtId" FROM negotiations negotiation)')
            .getMany();
    }
    async getDebtsPerEntity(userId) {
        return this.repository
            .createQueryBuilder('debt')
            .select(['debt.entityType', 'COUNT(*) as count'])
            .where('debt.userId = :userId', { userId })
            .groupBy('debt.entityType')
            .getRawMany();
    }
    async getDebtsPerMonth(userId, sixMonthsAgo) {
        return this.repository
            .createQueryBuilder('debt')
            .select([
            "DATE_TRUNC('month', debt.createdAt) as month",
            'COUNT(*) as count',
        ])
            .where('debt.userId = :userId', { userId })
            .andWhere('debt.createdAt >= :sixMonthsAgo', { sixMonthsAgo })
            .groupBy('month')
            .orderBy('month', 'DESC')
            .getRawMany();
    }
    async getDebtsPerType(userId) {
        return this.repository
            .createQueryBuilder('debt')
            .select(['debt.type', 'COUNT(*) as count'])
            .where('debt.userId = :userId', { userId })
            .groupBy('debt.type')
            .getRawMany();
    }
    async getDebtMetrics(userId, sixMonthsAgo) {
        const [perEntity, perMonth, perType, totalAmount] = await Promise.all([
            this.repository
                .createQueryBuilder('debt')
                .select(['debt.entity as "entityType"', 'SUM(debt.amount) as count'])
                .where('debt.userId = :userId', { userId })
                .groupBy('debt.entity')
                .getRawMany(),
            this.repository
                .createQueryBuilder('debt')
                .select([
                "DATE_TRUNC('month', debt.createdAt) as month",
                'COUNT(*) as count',
            ])
                .where('debt.userId = :userId', { userId })
                .andWhere('debt.createdAt >= :sixMonthsAgo', { sixMonthsAgo })
                .groupBy('month')
                .orderBy('month', 'DESC')
                .getRawMany(),
            this.repository
                .createQueryBuilder('debt')
                .select(['debt.type as "type"', 'SUM(debt.amount) as count'])
                .where('debt.userId = :userId', { userId })
                .groupBy('debt.type')
                .getRawMany(),
            this.repository
                .createQueryBuilder('debt')
                .select('SUM(debt.amount)', 'totalAmount')
                .where('debt.userId = :userId', { userId })
                .getRawOne(),
        ]);
        return { perEntity, perMonth, perType, totalAmount };
    }
    async update(id, updateDebtDto) {
        return this.repository.update({ id }, updateDebtDto);
    }
    async delete(id) {
        return this.repository.update({ id }, { deletedAt: new Date() });
    }
};
exports.DebtsRepository = DebtsRepository;
exports.DebtsRepository = DebtsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(debt_entity_1.Debt)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DebtsRepository);
//# sourceMappingURL=debts.repository.js.map