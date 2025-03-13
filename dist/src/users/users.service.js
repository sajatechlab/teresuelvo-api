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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const debts_repository_1 = require("../debts/debts.repository");
const negotiations_repository_1 = require("../negotiations/negotiations.repository");
let UsersService = class UsersService {
    constructor(usersRepository, debtsRepository, negotiationsRepository) {
        this.usersRepository = usersRepository;
        this.debtsRepository = debtsRepository;
        this.negotiationsRepository = negotiationsRepository;
    }
    async create(createUserDto) {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }
    findOne(email) {
        return this.usersRepository.findOne({ email });
    }
    async getDashboardMetrics(userId) {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const [debtMetrics, negotiationMetrics] = await Promise.all([
            this.debtsRepository.getDebtMetrics(userId, sixMonthsAgo),
            this.negotiationsRepository.getNegotiationMetrics(userId),
        ]);
        const metrics = {
            debtsPerEntity: debtMetrics.perEntity || [],
            totalAmountSaved: negotiationMetrics.totalSaved || 0,
            pendingPayments: negotiationMetrics.pendingPayments || 0,
            debtsPerMonth: debtMetrics.perMonth || [],
            debtsPerType: debtMetrics.perType || [],
            totalDebtAmount: debtMetrics.totalAmount?.totalAmount || 0,
            activeNegotiations: negotiationMetrics.activeNegotiations || 0,
            pendingPaymentsAmount: negotiationMetrics.pendingPaymentAmount || 0,
        };
        return metrics;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        debts_repository_1.DebtsRepository,
        negotiations_repository_1.NegotiationsRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map