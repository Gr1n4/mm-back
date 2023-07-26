import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from './user.schema';
import { Option } from 'src/types';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {}

  async getByEmailOrFail(email: string): Promise<UserDocument> {
    const user = await this.getByEmail(email);
    if (!user) {
      throw new NotFoundException('User with this email not found');
    }
    return user;
  }

  getByEmail(email: string): Promise<Option<UserDocument>> {
    return this.userModel.findOne({ email }).exec();
  }

  async getByIdOrFail(id: string): Promise<UserDocument> {
    const user = await this.getById(id);
    if (!user) {
      throw new NotFoundException('User with this id not found');
    }
    return user;
  }

  getById(id: string): Promise<Option<UserDocument>> {
    return this.userModel.findById(id).exec();
  }
}
