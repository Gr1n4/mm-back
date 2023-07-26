import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserDocument } from 'src/user';

@Schema()
export class SessionModel {
  @Prop({ type: Boolean })
  isExpired: boolean;

  @Prop({ type: Types.ObjectId, ref: 'UserModel' })
  user: UserDocument;
}

export type SessionDocument = HydratedDocument<SessionModel>;
export const SessionSchema = SchemaFactory.createForClass(SessionModel);
