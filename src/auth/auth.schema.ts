import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserDocument } from 'src/user';

@Schema()
export class AuthModel {
  @Prop({ type: Boolean, default: false })
  isCompleted: boolean;

  @Prop({ type: Types.ObjectId, ref: 'UserModel' })
  user: UserDocument;
}

export type AuthDocument = HydratedDocument<AuthModel>;
export const AuthSchema = SchemaFactory.createForClass(AuthModel);
