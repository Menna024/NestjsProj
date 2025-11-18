import { Prop, Schema, SchemaFactory, MongooseModule } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.model';
import { Product } from './product.model';

export class Cart {
    @Prop({ type: Types.ObjectId, 
        ref: User.name, 
        required: true,
    unique: true })
        user:Types.ObjectId;
        
    @Prop({
        product: [{ type: Types.ObjectId, ref: Product.name,
            required: true
         }],
        quantity: { type: Number, default: 1 },
        })
items:{product:Types.ObjectId, quantity:number}[];}   

const cartSchema=SchemaFactory.createForClass(Cart);    
export const CartModel = MongooseModule.forFeature([{name:Cart.name,schema:cartSchema}]);