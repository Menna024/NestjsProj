import { HydratedDocument } from 'mongoose';

export interface IProduct{

    name:string;

    slug:string;

   description:string;

    createdBy:Types.ObjectId;

    images:string[];

    
   originalPrice:number;

    
    discount:number;

   salePrice:number;

    
    stock:number;

        
    

    solfItems:number;

    category:Types.ObjectId;

    brand:Types.ObjectId;
}

export type HydrateProduct = HydratedDocument<IProduct>;
