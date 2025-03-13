"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NegotiationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const negotiation_entity_1 = require("./negotiation.entity");
const negotiations_service_1 = require("./negotiations.service");
const negotiations_controller_1 = require("./negotiations.controller");
const negotiations_repository_1 = require("./negotiations.repository");
let NegotiationsModule = class NegotiationsModule {
};
exports.NegotiationsModule = NegotiationsModule;
exports.NegotiationsModule = NegotiationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([negotiation_entity_1.Negotiation])],
        providers: [negotiations_service_1.NegotiationsService, negotiations_repository_1.NegotiationsRepository],
        exports: [negotiations_service_1.NegotiationsService, negotiations_repository_1.NegotiationsRepository],
        controllers: [negotiations_controller_1.NegotiationsController],
    })
], NegotiationsModule);
//# sourceMappingURL=negotiations.module.js.map