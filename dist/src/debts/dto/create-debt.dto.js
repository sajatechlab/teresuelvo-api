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
exports.CreateDebtDto = void 0;
const class_validator_1 = require("class-validator");
const type_enum_1 = require("../enum/type.enum");
class CreateDebtDto {
}
exports.CreateDebtDto = CreateDebtDto;
__decorate([
    (0, class_validator_1.IsEnum)(type_enum_1.DebtType),
    __metadata("design:type", String)
], CreateDebtDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.type === type_enum_1.DebtType.OTHER),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDebtDto.prototype, "otherType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(type_enum_1.DebtEntity),
    __metadata("design:type", String)
], CreateDebtDto.prototype, "entity", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.entity === type_enum_1.DebtEntity.OTHER),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDebtDto.prototype, "otherEntity", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDebtDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateDebtDto.prototype, "guarantee", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDebtDto.prototype, "description", void 0);
//# sourceMappingURL=create-debt.dto.js.map