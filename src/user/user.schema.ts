import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { HydratedDocument } from 'mongoose';

@Schema()
export class UserModel {
  @Prop({ type: String, unique: true })
  email: string;
  @Prop({ type: Boolean })
  isActive: boolean;

  @Prop({ type: String })
  passwordHash?: string;
  @Prop({ type: String })
  salt?: string;

  password?: string;

  isPasswordEqual(password: string): boolean {
    if (!this.salt || !this.passwordHash) {
      return false;
    }
    const hash = pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.passwordHash === hash;
  }
}

export type UserDocument = HydratedDocument<UserModel>;
export const UserSchema = SchemaFactory.createForClass(UserModel);

UserSchema.virtual('password').set((that: UserDocument, pwd: string) => {
  const salt = randomBytes(16).toString('hex');
  const passwordHash = pbkdf2Sync(pwd, salt, 1000, 64, 'sha512').toString('hex');
  that.set({ salt, passwordHash });
});
