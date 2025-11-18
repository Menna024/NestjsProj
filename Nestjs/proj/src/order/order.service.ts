import { Injectable } from '@nestjs/common';
import { Cart } from 'src/models/cart.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/models/order.model';
import { PaymentMethod } from 'src/types/order.type';
import { Types } from 'mongoose';

@Injectable()
export class OrderService {
constructor(
    @InjectModel(Order.name)
    private readonly orderModel:Model<Order>,
    @InjectModel(Cart.name)
    private readonly cartModel:Model<Cart>,
) {}

 async createOrder(userId:Types.ObjectId,
    discount:number,
    paymentMethod:PaymentMethod,
    address:string,
    phone:string,
    instruction?:string[],       
){
    const cart = await this.cartModel.findOne({user:userId}).populate('items.product');
    if(!cart || cart.items.length === 0){
        throw new Error('Cart is empty');
    }

    let subtotal = 0;
    cart.items.forEach(item => {
        const product = item.product as any;
        subtotal += product.price * item.quantity;
    });

    const finalAmount = subtotal - discount;

    const order = new this.orderModel({
        user:userId,
        items:cart.items.map(item => ({     
            product:item.product._id,
            quantity:item.quantity
        })),    

        subtotal,
        discount,
        finalAmount,
        address,
        phone,
        instruction,
        paymentMethod,
    });
    await order.save();

    cart.items = [];
    await cart.save();
    return order;
}}