import { MongooseModule, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.model';

export class Brand {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  slug: string;

  @Prop({
    type: String,
    required: true,
  })
  image: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: User.name,
  })
  createdBy: mongoose.Types.ObjectId;
}

const brandSchema = SchemaFactory.createForClass(Brand);

brandSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

export const BrandModel = MongooseModule.forFeature([
  { name: Brand.name, schema: brandSchema },
]);
