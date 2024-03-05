import { UserData } from "./UserData";
import { HairCut } from "./hairCut";

export interface Appointment {
    id: string;
    date: Date;
    price: Int16Array;
    user : UserData;
    haircut: HairCut;
    barber: UserData;
    payType:PayType ;
    ispaid: boolean;
}


export enum PayType {
    PIX = "Pix" ,
    CARD = "Cartão", 
    MONEY = "Dinheiro", 
}