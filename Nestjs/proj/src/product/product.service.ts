import { BrandModel } from './../models/category.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Product } from "src/models/product.model";
import { Category } from 'src/models/category.model';
import { Brand } from 'src/models/brand.model';
import { IProduct } from 'src/types/product.type';


@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        @InjectModel(Category.name) private categoryModel: Model<Category>,
        @InjectModel(Brand.name) private BrandModel:Model<Brand>) {}

    async createProduct(data:IProduct
    ){
        const brand = await this.BrandModel.findOne({_id:data.brand});
        if(!brand){
            throw new Error('Brand not found');
        }

        const category = await this.categoryModel.findOne
        ({_id:data.category});
        if(!category){
            throw new Error('Category not found');
        }

        data.salePrice = data.originalPrice - 
        (data.originalPrice * data.discount / 100);
        const newProduct = new this.productModel(data);
        return newProduct.save();
    }
}