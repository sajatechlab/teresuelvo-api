import { DebtsService } from './debts.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { User } from '@/users';
export declare class DebtsController {
    private readonly debtsService;
    constructor(debtsService: DebtsService);
    create(createDebtDto: CreateDebtDto, user: User): Promise<import("./debt.entity").Debt>;
    findAll(user: User): Promise<import("./debt.entity").Debt[]>;
    findAllNotNegotiated(user: User): Promise<import("./debt.entity").Debt[]>;
    update(id: string, updateDebtDto: UpdateDebtDto): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").UpdateResult>;
}
