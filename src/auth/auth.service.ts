import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthModel } from './auth.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(AuthModel.name) private readonly authModel: Model<AuthModel>) {}
}
