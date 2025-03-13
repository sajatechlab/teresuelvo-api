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
exports.NegotiationsController = void 0;
const common_1 = require("@nestjs/common");
const negotiations_service_1 = require("./negotiations.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const user_decorator_1 = require("../common/decorators/user.decorator");
const users_1 = require("../users");
const status_enum_1 = require("./enum/status.enum");
let NegotiationsController = class NegotiationsController {
    constructor(negotiationsService) {
        this.negotiationsService = negotiationsService;
    }
    create(debtId) {
        return this.negotiationsService.create(debtId);
    }
    updateStatus(id, status) {
        return this.negotiationsService.updateStatus(id, status);
    }
    findAll(user) {
        return this.negotiationsService.findAll(user.id);
    }
    getNegotiationMetrics(user) {
        return this.negotiationsService.getNegotiationMetrics(user.id);
    }
};
exports.NegotiationsController = NegotiationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('debtId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NegotiationsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], NegotiationsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_1.User]),
    __metadata("design:returntype", void 0)
], NegotiationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('metrics'),
    __param(0, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_1.User]),
    __metadata("design:returntype", void 0)
], NegotiationsController.prototype, "getNegotiationMetrics", null);
exports.NegotiationsController = NegotiationsController = __decorate([
    (0, common_1.Controller)('negotiations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [negotiations_service_1.NegotiationsService])
], NegotiationsController);
//# sourceMappingURL=negotiations.controller.js.map