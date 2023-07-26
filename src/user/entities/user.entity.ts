import { Types } from 'mongoose';

interface UserFields {
  _id: Types.ObjectId;
  email: string;
  isActive: boolean;
}

export class UserEntity {
  id: string;
  email: string;
  isActive: boolean;
  constructor({ _id, email, isActive }: UserFields) {
    this.id = _id.toString();
    this.email = email;
    this.isActive = isActive;
  }
}
