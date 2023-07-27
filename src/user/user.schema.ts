import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { Document, HydratedDocument } from 'mongoose';
import { UserRole } from './user.types';
import { Types } from 'mongoose';
import { AuthDocument } from 'src/auth/auth.schema';

@Schema()
export class UserModel extends Document {
  @Prop({ type: String, unique: true })
  email: string;
  @Prop({ type: Boolean, default: false })
  isActive: boolean;
  @Prop({ type: String, enum: UserRole, default: UserRole.MANAGER })
  role: UserRole;

  @Prop({ type: String })
  passwordHash?: string;
  @Prop({ type: String })
  salt?: string;

  @Prop({ type: Types.ObjectId, ref: 'AuthModel' })
  auth: AuthDocument;

  password?: string;
  isPasswordEqual: (password: string) => boolean;
}

export type UserDocument = HydratedDocument<UserModel>;
export const UserSchema = SchemaFactory.createForClass(UserModel);

UserSchema.virtual('password').set(function (this: UserDocument, pwd: string) {
  const salt = randomBytes(16).toString('hex');
  const passwordHash = pbkdf2Sync(pwd, salt, 1000, 64, 'sha512').toString('hex');
  this.set({ salt, passwordHash });
});

UserSchema.methods.isPasswordEqual = function (password: string): boolean {
  if (!this.salt || !this.passwordHash) {
    return false;
  }
  const hash = pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.passwordHash === hash;
};
