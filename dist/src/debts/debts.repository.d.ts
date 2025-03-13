import { Repository } from 'typeorm';
import { Debt } from './debt.entity';
import { UpdateDebtDto } from './dto/update-debt.dto';
export declare class DebtsRepository {
    private repository;
    constructor(repository: Repository<Debt>);
    create(data: Partial<Debt>): Debt;
    save(debt: Debt): Promise<Debt>;
    findOne(id: string): Promise<Debt | null>;
    findByUser(userId: string): Promise<Debt[]>;
    findAllNotNegotiated(userId: string): Promise<Debt[]>;
    getDebtsPerEntity(userId: string): Promise<any[]>;
    getDebtsPerMonth(userId: string, sixMonthsAgo: Date): Promise<any[]>;
    getDebtsPerType(userId: string): Promise<any[]>;
    getDebtMetrics(userId: string, sixMonthsAgo: Date): Promise<{
        perEntity: any[];
        perMonth: any[];
        perType: any[];
        totalAmount: any;
    }>;
    update(id: string, updateDebtDto: UpdateDebtDto): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").UpdateResult>;
}
