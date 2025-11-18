import { CartModel } from "src/models/cart.model";
import { JwtService } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { UserModel } from "src/models/user.model";
import { OrderModel } from "src/models/order.model";

@Module(
    {
        imports: [OrderModel, UserModel, CartModel],
        controllers: [OrderController],
        providers: [OrderService, JwtService],
    }
)
export class OrderModule {}