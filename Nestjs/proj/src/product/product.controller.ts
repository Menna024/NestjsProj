import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { IProduct } from 'src/types/product.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('images',
        10,{
            storage:multerOptions('./src/uploads/products')
        }
    ))
    create(@Req() req, @Body() data:IProduct,
    @UploadedFiles() files: Express.Multer.File[]) {
        data.images = files.map(file => file.path);
        data.createdBy = req.user._id;

        return this.productService.createProduct(data);
    }

}
