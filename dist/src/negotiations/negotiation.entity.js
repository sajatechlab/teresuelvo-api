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
exports.Negotiation = void 0;
const typeorm_1 = require("typeorm");
const debt_entity_1 = require("../debts/debt.entity");
const status_enum_1 = require("./enum/status.enum");
let Negotiation = class Negotiation {
};
exports.Negotiation = Negotiation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Negotiation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Negotiation.prototype, "amountNegotiated", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: status_enum_1.NegotiationStatus,
        default: status_enum_1.NegotiationStatus.PENDING_REVISION,
    }),
    __metadata("design:type", String)
], Negotiation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => debt_entity_1.Debt, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'debtId' }),
    __metadata("design:type", debt_entity_1.Debt)
], Negotiation.prototype, "debt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Negotiation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Negotiation.prototype, "updatedAt", void 0);
exports.Negotiation = Negotiation = __decorate([
    (0, typeorm_1.Entity)('negotiations')
], Negotiation);
//# sourceMappingURL=negotiation.entity.js.map