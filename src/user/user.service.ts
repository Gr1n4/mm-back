import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserDocument, UserModel } from './user.schema';
import { Option } from 'src/types';
import { UserCreateDto, UserFeedDto } from './dto';
import { RemoveEntity } from 'src/utils';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {}

  async feed({ role }: UserFeedDto): Promise<UserDocument[]> {
    return this.userModel.find({ role: { $in: role ?? [] } }).exec();
  }

  async createWithPassword({ email, role, password }: UserCreateDto & { password: string }): Promise<UserDocument> {
    const oldUser = await this.getByEmail(email);
    if (oldUser) {
      throw new BadRequestException('User with this email already exists');
    }
    return this.userModel.create({ email, role, password, isActive: true });
  }

  async create({ email, role }: UserCreateDto): Promise<UserDocument> {
    const oldUser = await this.getByEmail(email);
    if (oldUser) {
      throw new BadRequestException('User with this email already exists');
    }
    return this.userModel.create({ email, role });
  }

  async removeById(id: string): Promise<RemoveEntity> {
    return this.userModel.deleteOne({ _id: id }).exec();
  }

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

  findOne(query: FilterQuery<UserModel>): Promise<Option<UserDocument>> {
    return this.userModel.findOne(query).exec();
  }
}
