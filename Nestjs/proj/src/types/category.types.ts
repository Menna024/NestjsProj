import { HydratedDocument } from 'mongoose';
export interface ICategory {
name: string;
slug: string;
image: string;
createdBy: string;
brands: Types.ObjectId[];
}

export type HydratedCategory = HydratedDocument<ICategory>;