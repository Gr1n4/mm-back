import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SessionDocument, SessionModel } from './session.schema';
import { Model } from 'mongoose';
import { Option } from 'src/types';

@Injectable()
export class SessionService {
  constructor(@InjectModel(SessionModel.name) private readonly sessionModel: Model<SessionModel>) {}

  async create(userId: string): Promise<SessionDocument> {
    const { _id } = await this.sessionModel.create({ user: userId });
    return this.getById(_id.toString());
  }

  getById(id: string): Promise<Option<SessionDocument>> {
    return this.sessionModel.findById(id).populate('user').exec();
  }
}
