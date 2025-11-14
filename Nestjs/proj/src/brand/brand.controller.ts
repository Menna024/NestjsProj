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
import { BrandService } from './brand.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as Multer from 'multer';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { diskStorage } from 'multer';
import { Types } from 'mongoose';
import { multerOption } from 'src/common/utils/multer';

export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multerOption,
    }),
  )
  async createBrand(
    @Req() req,
    @Body() data: brandType.IBrand,
    @UploadedFile() image: Multer.File,
  ) {
    data.image = image.path;
    data.createdBy = req.user._id;
    return await this.brandService.create(data);
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
  async updateBrand(
    @Req() req,
    @Body() data: brandType.IBrand,
    @Param('id') brandId: Types.ObjectId,
    @UploadedFile() image: Multer.File,
  ) {
    data.image = image.path;
    data.createdBy = req.user._id;
    return await this.brandService.updateBrand(brandId, data as any);
    data;
  }

  @Get('all')
  async findAll() {
    return await this.brandService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: Types.ObjectId) {
    return await this.brandService.findOne(id);
  }
}
