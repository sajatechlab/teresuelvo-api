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
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const companies_repository_1 = require("./companies.repository");
let CompaniesService = class CompaniesService {
    constructor(companiesRepository) {
        this.companiesRepository = companiesRepository;
    }
    async create(createCompanyDto, user) {
        console.log('createCompanyDto', user);
        try {
            const existingCompany = await this.companiesRepository.findByDocumentNumber(createCompanyDto.documentNumber);
            if (existingCompany) {
                throw new common_1.ConflictException('Company with this document number already exists');
            }
            return this.companiesRepository.create({
                ...createCompanyDto,
                user,
            });
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error creating company');
        }
    }
    findOne(id) {
        return this.companiesRepository.findOne({ id });
    }
    findByDocumentNumber(documentNumber) {
        return this.companiesRepository.findByDocumentNumber(documentNumber);
    }
    async validateCompanyData(documentNumber) {
        const query = [];
        if (documentNumber) {
            query.push({ documentNumber });
        }
        const existingCompany = await this.companiesRepository.findOne(query);
        return !existingCompany;
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [companies_repository_1.CompaniesRepository])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map