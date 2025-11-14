import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  sayHello() {
    return 'hello';
  }

  sayHi(): Promise<User[]> {
    return this.userModel.find();
  }
}
