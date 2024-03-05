export interface UserData {
    accountType: AccountType;
    createdAt: Date;
    id: string;
    name: string;
    cpf: string;
    cellphone: string;
    email: string;   
}

export enum AccountType {
    ADMIN = "Administrador" ,
    USER = "Usuário", 
    BARBER = "Barbeiro", 
}