import {Prop,Schema} from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { IOrder } from 'src/types/order.type';
import { PaymentMethod, OrderStatus } from 'src/types/order.type'; 

@Schema({
  timestamps: true,
})
export class Order implements IOrder{
    @Prop({type:SchemaTypes.ObjectId,ref:'User',required:true})
    user:Types.ObjectId;

    @Prop([{product:{type:SchemaTypes.ObjectId,ref:'Product',required:true},
    quantity:{type:Number,required:true}}])
    items:{
        product:Types.ObjectId,
        quantity:number
    }[];

    @Prop({type:Number,required:true})
    subtotal:number;

    @Prop({type:Number,required:true})
    discount:number;
    @Prop({type:Number,required:true})
    finalAmount:number;

    @Prop({type:String,required:true})
    address:string;

    @Prop({type:[String]})
    instruction?:string[];

    @Prop({type:String,required:true})
    phone:string;

    @Prop({type:String,enum:['COD','ONLINE'],required:true})
    paymentMethod:PaymentMethod;

    @Prop({type:String,enum:['PENDING','CONFIRMED','SHIPPED','DELIVERED','CANCELLED'],default:'PENDING'})
    status:OrderStatus;



}