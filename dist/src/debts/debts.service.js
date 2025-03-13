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
exports.DebtsService = void 0;
const common_1 = require("@nestjs/common");
const debts_repository_1 = require("./debts.repository");
let DebtsService = class DebtsService {
    constructor(debtsRepository) {
        this.debtsRepository = debtsRepository;
    }
    async create(createDebtDto, user) {
        const debt = this.debtsRepository.create({
            ...createDebtDto,
            user,
        });
        return this.debtsRepository.save(debt);
    }
    findOne(id) {
        return this.debtsRepository.findOne(id);
    }
    findByUser(userId) {
        return this.debtsRepository.findByUser(userId);
    }
    async findAllByUser(userId) {
        return this.debtsRepository.findByUser(userId);
    }
    async findAllNotNegotiated(userId) {
        return this.debtsRepository.findAllNotNegotiated(userId);
    }
    async update(id, updateDebtDto) {
        const debt = await this.debtsRepository.findOne(id);
        if (!debt) {
            throw new common_1.NotFoundException('Debt not found');
        }
        return this.debtsRepository.update(id, updateDebtDto);
    }
    async delete(id) {
        const debt = await this.debtsRepository.findOne(id);
        if (!debt) {
            throw new common_1.NotFoundException('Debt not found');
        }
        return this.debtsRepository.delete(id);
    }
};
exports.DebtsService = DebtsService;
exports.DebtsService = DebtsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [debts_repository_1.DebtsRepository])
], DebtsService);
//# sourceMappingURL=debts.service.js.map