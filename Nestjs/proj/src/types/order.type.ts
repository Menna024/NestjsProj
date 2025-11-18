import { Types } from "mongoose";
import { HydratedDocument } from "mongoose";

export interface IOrder{
    user: Types.ObjectId;
    items: 
    {
    product:Types.ObjectId,
     quantity:number}[];
    subtotal: number;
    discount: number;
    finalAmount: number;
    address:string;
    instruction?:string[];
    phone:string;
    paymentMethod: PaymentMethod;
    status: OrderStatus;
}

export enum PaymentMethod{
    COD='COD',
    ONLINE='ONLINE'
}   

export enum OrderStatus{
    PENDING='PENDING',
    CONFIRMED='CONFIRMED',
    SHIPPED='SHIPPED',
    DELIVERED='DELIVERED',
    CANCELLED='CANCELLED'
}

export type HOrder = HydratedDocument<IOrder>;