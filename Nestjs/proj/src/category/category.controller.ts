import { Category } from './../models/category.model';
import {
  Body,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import * as brandType from '../types/brand.type';
import { BrandService, CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as Multer from 'multer';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { diskStorage } from 'multer';
import { Types } from 'mongoose';
import { multerOption } from 'src/common/utils/multer';
import { ICategory } from 'src/types/category.types';
import { CategoryModule } from './category.module';
import {Controller} from '@nestjs/common';

@Controller('category') 
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multerOption,
    }),
  )
  async create(
    @Req() req,
    @Body() data: ICategory,
    @UploadedFile() image: Multer.File,
  ) {
    data.image = image.path;
    data.createdBy = req.user._id;
    return await this.categoryService.create(data);
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        distination: './uploads',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async update(
    @Req() req,
    @Body() data: ICategory,
    @Param('id') categoryId: Types.ObjectId,
    @UploadedFile() image: Multer.File,
  ) {
    data.image = image.path;
    data.createdBy = req.user._id;
    return await this.categoryService.update(categoryId, data as any);
    data;
  }

  @Get('all')
  async findAll() {
    return await this.categoryService.getAllCategories();
  }

  @Get(':id')
  async findOne(@Param('id') id: Types.ObjectId) {
    return await this.categoryService.findOne(id);
  }
}
