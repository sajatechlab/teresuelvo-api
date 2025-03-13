import { Repository, FindOptionsWhere } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersRepository {
    private repository;
    constructor(repository: Repository<User>);
    create(data: CreateUserDto): User;
    save(user: User): Promise<User>;
    findOne(query: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByDocumentNumber(documentNumber: string): Promise<User | null>;
}
