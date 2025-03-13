"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const company_entity_1 = require("./company.entity");
const companies_service_1 = require("./companies.service");
const companies_controller_1 = require("./companies.controller");
const companies_repository_1 = require("./companies.repository");
let CompaniesModule = class CompaniesModule {
};
exports.CompaniesModule = CompaniesModule;
exports.CompaniesModule = CompaniesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([company_entity_1.Company])],
        providers: [companies_service_1.CompaniesService, companies_repository_1.CompaniesRepository],
        exports: [companies_service_1.CompaniesService, companies_repository_1.CompaniesRepository],
        controllers: [companies_controller_1.CompaniesController],
    })
], CompaniesModule);
//# sourceMappingURL=companies.module.js.map