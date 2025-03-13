export declare class User {
    id: string;
    name: string;
    lastName: string;
    documentType: 'CC' | 'CE' | 'PASSPORT';
    documentNumber: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
