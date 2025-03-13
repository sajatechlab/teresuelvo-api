import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../users/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<User>;
    getDashboardMetrics(user: User): Promise<import("./interfaces/dashboard-metrics.interface").DashboardMetrics>;
}
