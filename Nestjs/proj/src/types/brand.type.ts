import mongoose, { HydratedDocument } from 'mongoose';

export interface IBrand {
  name: string;

  slug: string;

  image: string;

  createdBy: mongoose.Types.ObjectId;
}

export type HydratedBrand = HydratedDocument<IBrand>;
