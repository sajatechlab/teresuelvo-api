import { Repository, FindOptionsWhere } from 'typeorm';
import { Company } from './company.entity';
export declare class CompaniesRepository {
    private repository;
    constructor(repository: Repository<Company>);
    create(data: Partial<Company>): Promise<Company>;
    save(company: Company): Promise<Company>;
    findOne(query: FindOptionsWhere<Company> | FindOptionsWhere<Company>[]): Promise<Company | null>;
    findByDocumentNumber(documentNumber: string): Promise<Company | null>;
}
