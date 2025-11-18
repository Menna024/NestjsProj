import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import {  CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { BrandModel } from 'src/models/brand.model';
import { UserModel } from 'src/models/user.model';

@Module({
  imports: [CategoryModule,BrandModel,
    UserModel
  ],
  controllers: [CategoryController],
  providers: [CategoryService,JwtService],
})
export class CategoryModule {}