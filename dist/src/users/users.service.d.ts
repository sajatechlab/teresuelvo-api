import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { DebtsRepository } from '@/debts/debts.repository';
import { NegotiationsRepository } from '@/negotiations/negotiations.repository';
import { DashboardMetrics } from './interfaces/dashboard-metrics.interface';
export declare class UsersService {
    private usersRepository;
    private debtsRepository;
    private negotiationsRepository;
    constructor(usersRepository: UsersRepository, debtsRepository: DebtsRepository, negotiationsRepository: NegotiationsRepository);
    create(createUserDto: CreateUserDto): Promise<User>;
    findOne(email: string): Promise<User | null>;
    getDashboardMetrics(userId: string): Promise<DashboardMetrics>;
}
