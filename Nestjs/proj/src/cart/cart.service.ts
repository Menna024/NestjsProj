import { InjectModel } from '@nestjs/mongoose';

import { Injectable } from '@nestjs/common';
import { Cart } from 'src/models/cart.model';
import { Model, Types } from 'mongoose';
import { Product } from 'src/models/product.model';

@Injectable()
export class CartService {
        constructor(@InjectModel(Cart.name)
    private readonly cartModel:Model<Cart>,
    @InjectModel(Product.name) private readonly productModel:Model<Product>) {}

    async getCart(userId:Types.ObjectId){
        const cart = await this.cartModel.findOne({user:userId}).populate('items.product');
 
        if(!cart){
            throw new Error('Cart not found');
        }

        return cart;
    }

    async addToCart(userId:Types.ObjectId,
    productId:Types.ObjectId,
    quantity:number){
       
        const product = await this.productModel.findById(productId);
        if(!product){
            throw new Error('Product not found');
        }
       
 let cart = await this.cartModel.findOne({user:userId});
        if(!cart){
            cart = new this.cartModel({user:userId,items:[]});
        
            cart = await this.cartModel.create({
                user:userId,
                items:[{product:productId,quantity:quantity}]
            });
            return cart;
        }

        const itemIndex = cart.items.findIndex(item =>
            item.product.toString() === productId.toString());
        if(itemIndex > -1){
            cart.items[itemIndex].quantity += quantity;
            if(!(product.stock >= cart.items[itemIndex].quantity)){
                cart.items[itemIndex].quantity -= quantity;
                throw new Error('Insufficient stock');
            }

        }else{
            cart.items.push({product:productId,quantity:quantity});
        }

        return await cart.save();
    }

    async removeFromCart({
        userId,
        productId,
    }:{
        userId:Types.ObjectId,
        productId:Types.ObjectId,
    }){
        const cart = await this.cartModel.findOne({user:userId});
        if(!cart){
            throw new Error('Cart not found');
        }

        const itemIndex = cart.items.findIndex(item =>
            item.product.toString() === productId.toString());  
        if(itemIndex > -1){
            cart.items.splice(itemIndex,1);
        }else{
            throw new Error('Product not found in cart');
        }
        return await cart.save();
        
    }

}