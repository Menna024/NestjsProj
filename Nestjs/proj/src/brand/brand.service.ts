import { InjectModel } from '@nestjs/mongoose';
import { Brand } from '../models/brand.model';
import { Model, Types } from 'mongoose';
import { type IBrand } from 'src/types/brand.type';

export class BrandService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async create(data: IBrand) {
    const isExist = await this.brandModel.findOne({ name: data.name });
    if (isExist) {
      throw new Error('Brand already exist');
    }

    return await this.brandModel.create(data);
  }

  async updateBrand(brandId: Types.ObjectId, data: IBrand) {
    const brand = await this.brandModel.findOne({
      _id: brandId,
      createdBy: data.createdBy,
    });
    if (!brand) {
      throw new Error('Brand not found');
    }
    if (data.name) {
      brand.name = data.name;
    }

    if (data.image) {
      brand.image = data.image;
    }
    return await brand.save();
  }

  async findOne(id: Types.ObjectId) {
    return await this.brandModel.findOne({ _id: id });
  }

  async findAll() {
    return await this.brandModel.find();
  }
}
