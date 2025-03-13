import { JwtService } from '@nestjs/jwt';
import { UsersService, CreateUserDto, UsersRepository } from '../users';
export declare class AuthService {
    private usersService;
    private jwtService;
    private usersRepository;
    constructor(usersService: UsersService, jwtService: JwtService, usersRepository: UsersRepository);
    validateUser(email: string, password: string): Promise<any>;
    signup(createUserDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    validateUserData(documentNumber?: string, email?: string): Promise<boolean>;
}
