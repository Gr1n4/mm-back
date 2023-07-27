import { UserDocument, UserEntity } from 'src/user';
import { Types } from 'mongoose';

interface SessionFields {
  _id: Types.ObjectId;
  isExpired: boolean;
  user: UserDocument;
}

export class SessionEntity {
  id: string;
  isExpired: boolean;
  user: UserEntity;

  constructor({ _id, isExpired, user }: SessionFields) {
    this.id = _id.toString();
    this.isExpired = isExpired;
    this.user = new UserEntity(user);
  }
}
