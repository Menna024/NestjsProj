import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    required: true,
    min: [3, 'First Name must be at least 3 characters long'],
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
    min: [3, 'Last Name must be at least 3 characters long'],
  })
  lastName: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    set(value: string) {
      return value + '3';
    },
  })
  password: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export const UserModel = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);
