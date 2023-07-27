import { Types } from 'mongoose';
import { UserRole } from '../user.types';
import { Option } from 'src/types';
import { AuthDocument } from 'src/auth/auth.schema';

interface UserFields {
  _id: Types.ObjectId;
  email: string;
  isActive: boolean;
  role: UserRole;
  authId?: string;
  auth?: Types.ObjectId | AuthDocument;
}

export class UserEntity {
  id: string;
  email: string;
  isActive: boolean;
  role: UserRole;
  authId: Option<string>;
  constructor({ _id, email, isActive, role, authId, auth }: UserFields) {
    this.id = _id.toString();
    this.email = email;
    this.isActive = isActive;
    this.role = role;
    this.authId = authId ?? auth ? auth.toString() : null;
  }
}
