import { Controller,Post, Get, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '../common/guard/auth.guard';
import { Patch } from '@nestjs/common/decorators';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService:CartService){}

    @Get('/get-cart')
    @UseGuards(AuthGuard)
    async getCart(@Req() req    ){
        const userId = req.user._id;
        return await this.cartService.getCart(userId);
    }

    @Post('add-to-cart')
    @UseGuards(AuthGuard)
    async addToCart(@Req() req,
   ){
        const userId = req.user._id;
        const {productId,quantity} = req.body;
        return await this.cartService.addToCart(userId,productId,quantity);
    }

    @Patch('remove-from-cart')
    @UseGuards(AuthGuard)
    async removeFromCart(@Req() req    ){
        const userId = req.user._id;
        const {productId} = req.body;
        return await this.cartService.removeFromCart({userId,productId});
    }  
}