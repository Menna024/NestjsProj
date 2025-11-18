import { Types } from 'mongoose';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartModel } from 'src/models/cart.model';
import { UserModel } from 'src/models/user.model';
import { ProductModel } from 'src/models/product.model';
@Module({
    imports:[
        CartModel,
        UserModel,
        ProductModel
    ],
    controllers: [CartController],
    providers: [CartService,JwtService],
})
export class CartModule {}