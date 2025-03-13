import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from '../users/user.entity';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    create(user: User, createCompanyDto: CreateCompanyDto): Promise<import("./company.entity").Company>;
    validateCompanyData(documentNumber?: string): Promise<{
        isAvailable: true;
    }>;
}
