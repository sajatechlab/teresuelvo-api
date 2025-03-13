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
exports.NegotiationsService = void 0;
const common_1 = require("@nestjs/common");
const negotiations_repository_1 = require("./negotiations.repository");
let NegotiationsService = class NegotiationsService {
    constructor(negotiationsRepository) {
        this.negotiationsRepository = negotiationsRepository;
    }
    async create(debtId) {
        return this.negotiationsRepository.create(debtId);
    }
    findOne(id) {
        return this.negotiationsRepository.findOne(id);
    }
    findAll(userId) {
        return this.negotiationsRepository.findAll(userId);
    }
    getNegotiationMetrics(userId) {
        return this.negotiationsRepository.getNegotiationPageMetrics(userId);
    }
    updateStatus(id, status) {
        return this.negotiationsRepository.updateStatus(id, status);
    }
};
exports.NegotiationsService = NegotiationsService;
exports.NegotiationsService = NegotiationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [negotiations_repository_1.NegotiationsRepository])
], NegotiationsService);
//# sourceMappingURL=negotiations.service.js.map