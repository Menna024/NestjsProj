import { Category } from './../models/category.model';

import { InjectModel } from '@nestjs/mongoose';
import { Brand } from '../models/brand.model';
import { Model, Types } from 'mongoose';
import { ICategory } from 'src/types/category.types';
import { IBrand } from 'src/types/brand.type';
import { Injectable } from '@nestjs/common';


@Injectable()
export class CategoryService  {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<ICategory>,
        private readonly brandModel: Model<IBrand>,

  ) {}

  async create(data:ICategory):Promise<ICategory>{
    const isExist = await this.categoryModel.findOne({ name: data.name });
    if (isExist) {
      throw new Error('Category already exists');
    }

    if(data.brands && data.brands.length > 0){
      const foundBrands = await this.brandModel.find({ _id: { $in: data.brands } });
      if(foundBrands.length !== data.brands.length){
        throw new Error('One or more brands do not exist');
      }
    }
    const category = new this.categoryModel(data);
    return category.save();
  }

  async getAllCategories():Promise<ICategory[]>{
    return this.categoryModel.find().populate('brands').exec();
  }

  async update(id:Types.ObjectId,data:Partial<ICategory>):Promise<ICategory>{
    const category = await this.categoryModel.findOne({name:data.name});
    if(category && category._id.toString() !== id.toString()){
      throw new Error('Category name already exists');
    }

    if(data.brands && data.brands.length > 0){
      const foundBrands = await this.brandModel.find({ _id: { $in: data.brands } });
      if(foundBrands.length !== data.brands.length){
        throw new Error('One or more brands do not exist');
      }
    }

    return this.categoryModel.findByIdAndUpdate(id,data,{new:true}).exec();
  }

  async findOne(id:Types.ObjectId):Promise<ICategory>{
    return this.categoryModel.findById(id).populate('brands').exec();
  }
}