import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '@/users';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(createUserDto: CreateUserDto, response: Response): Promise<{
        message: string;
    }>;
    login(req: any, response: Response): Promise<{
        message: string;
    }>;
    logout(response: Response): Promise<{
        message: string;
    }>;
    getProfile(user: User): User;
    validateUserData(documentNumber?: string, email?: string): Promise<{
        isAvailable: true;
    }>;
}
