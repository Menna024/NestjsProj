
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";    
import slugify from "slugify";

import { MongooseModule } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Category } from "./category.model";
import { User } from "./user.model";    

@Schema(
    {
        timestamps: true,
    }
)
export class Product{
    @Prop({
        type: String,
        required: true,
        unique: true,
        set: function (value: string) {
this.set({slug:slugify(value)})
        }
    })
    name:string;

    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    slug:string;

    @Prop({
        type: String,
        required: true,
    })
    description:string;

    @Prop({
        type:mongoose.Schema.Types.ObjectId,
        ref:User.name,
        required:true,
    })
    createdBy:Types.ObjectId;

    @Prop({
        type: [String],
        required: true,
    })
    images:string[];

    
    @Prop({
        type: Number,
        required: true,
    })
    originalPrice:number;

    
    @Prop({
        type: Number,
        required: true,
    })
    discount:number;

    @Prop({
        type: Number,
        required: true,
    })
    salePrice:number;

    
    @Prop({
        type: Number,
        required: true,
        default:0,
    })
    stock:number;

        
    

    @Prop({
        type: Number,
        required: true,
    })
    solfItems:number;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: Category.name,
        required: true,
    })
    category:Types.ObjectId;

    
brand:Types.ObjectId;
}

const productSchema = SchemaFactory.createForClass(Product);
export const ProductModel = MongooseModule.forFeature([{name:Product.name,schema:productSchema}]);