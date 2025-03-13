export declare class CreateUserDto {
    name: string;
    lastName: string;
    documentType: 'CC' | 'CE' | 'PASSPORT';
    documentNumber: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
    password: string;
}
