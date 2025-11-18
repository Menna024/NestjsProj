import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '../common/guard/auth.guard';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService:OrderService){}
    @Post('/create-order')
    @UseGuards(AuthGuard)
    async createOrder(@Req() req    ){
        const userId = req.user._id;
        const {
            discount,
            paymentMethod,
            address,
            phone,
            instruction,
        } = req.body;

        return await this.orderService.createOrder(
            userId,
            discount,
            paymentMethod,
            address,
            phone,
            instruction,
        );
    }
}