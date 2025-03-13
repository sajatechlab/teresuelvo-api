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
exports.Debt = void 0;
const typeorm_1 = require("typeorm");
const users_1 = require("../users");
const type_enum_1 = require("./enum/type.enum");
let Debt = class Debt {
};
exports.Debt = Debt;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Debt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: type_enum_1.DebtType,
    }),
    __metadata("design:type", String)
], Debt.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Debt.prototype, "otherType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: type_enum_1.DebtEntity,
    }),
    __metadata("design:type", String)
], Debt.prototype, "entity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Debt.prototype, "otherEntity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Debt.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Debt.prototype, "guarantee", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Debt.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", users_1.User)
], Debt.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Debt.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Debt.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], Debt.prototype, "deletedAt", void 0);
exports.Debt = Debt = __decorate([
    (0, typeorm_1.Entity)('debts')
], Debt);
//# sourceMappingURL=debt.entity.js.map