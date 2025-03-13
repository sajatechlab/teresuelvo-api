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
exports.DebtsController = void 0;
const common_1 = require("@nestjs/common");
const debts_service_1 = require("./debts.service");
const create_debt_dto_1 = require("./dto/create-debt.dto");
const update_debt_dto_1 = require("./dto/update-debt.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const users_1 = require("../users");
const user_decorator_1 = require("../common/decorators/user.decorator");
let DebtsController = class DebtsController {
    constructor(debtsService) {
        this.debtsService = debtsService;
    }
    create(createDebtDto, user) {
        return this.debtsService.create(createDebtDto, user);
    }
    findAll(user) {
        return this.debtsService.findAllByUser(user.id);
    }
    findAllNotNegotiated(user) {
        return this.debtsService.findAllNotNegotiated(user.id);
    }
    update(id, updateDebtDto) {
        return this.debtsService.update(id, updateDebtDto);
    }
    delete(id) {
        return this.debtsService.delete(id);
    }
};
exports.DebtsController = DebtsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_debt_dto_1.CreateDebtDto, users_1.User]),
    __metadata("design:returntype", void 0)
], DebtsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_1.User]),
    __metadata("design:returntype", void 0)
], DebtsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('not-negotiated'),
    __param(0, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_1.User]),
    __metadata("design:returntype", void 0)
], DebtsController.prototype, "findAllNotNegotiated", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_debt_dto_1.UpdateDebtDto]),
    __metadata("design:returntype", void 0)
], DebtsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DebtsController.prototype, "delete", null);
exports.DebtsController = DebtsController = __decorate([
    (0, common_1.Controller)('debts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [debts_service_1.DebtsService])
], DebtsController);
//# sourceMappingURL=debts.controller.js.map