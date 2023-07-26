import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SessionModel } from './session.schema';
import { Model } from 'mongoose';

@Injectable()
export class SessionService {
  constructor(@InjectModel(SessionModel.name) private readonly sessionModel: Model<SessionModel>) {}
}
