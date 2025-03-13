import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from '../users/user.entity';
import { CompaniesRepository } from './companies.repository';
export declare class CompaniesService {
    private companiesRepository;
    constructor(companiesRepository: CompaniesRepository);
    create(createCompanyDto: CreateCompanyDto, user: User): Promise<import("./company.entity").Company>;
    findOne(id: string): Promise<import("./company.entity").Company | null>;
    findByDocumentNumber(documentNumber: string): Promise<import("./company.entity").Company | null>;
    validateCompanyData(documentNumber?: string): Promise<boolean>;
}
