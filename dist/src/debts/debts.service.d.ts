import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { DebtsRepository } from './debts.repository';
import { User } from '@/users';
export declare class DebtsService {
    private debtsRepository;
    constructor(debtsRepository: DebtsRepository);
    create(createDebtDto: CreateDebtDto, user: User): Promise<import("./debt.entity").Debt>;
    findOne(id: string): Promise<import("./debt.entity").Debt | null>;
    findByUser(userId: string): Promise<import("./debt.entity").Debt[]>;
    findAllByUser(userId: string): Promise<import("./debt.entity").Debt[]>;
    findAllNotNegotiated(userId: string): Promise<import("./debt.entity").Debt[]>;
    update(id: string, updateDebtDto: UpdateDebtDto): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").UpdateResult>;
}
