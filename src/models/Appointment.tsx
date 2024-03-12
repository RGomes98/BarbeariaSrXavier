import { Employee } from "@/mock/users";
import { HairCut } from "./HairCut";
import { UserData } from "./UserData";

export interface Appointment {
    id: string;
    date: Date;
    price: Number;
    user : UserData;
    haircut: HairCut;
    barber: Employee;
    payType:PayType ;
    ispaid: boolean;
}


export enum PayType {
    PIX = "Pix" ,
    CARD = "Cartão", 
    MONEY = "Dinheiro", 
}