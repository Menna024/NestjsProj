import { MongooseModule, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { User } from './user.model';
import slugify from 'slugify';
import { Brand } from './brand.model';


export class Category {
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
brands:Array<Types.ObjectId>;
}

const categorySchema = SchemaFactory.createForClass(Category);

categorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

export const categoryModel = MongooseModule.forFeature([
  { name: Category.name, schema: categorySchema },
]);
