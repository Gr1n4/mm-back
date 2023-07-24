import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class PictureModel {
  @Prop({ type: Number })
  width: number;
  @Prop({ type: Number })
  height: number;
  @Prop({ type: Number })
  size: number;
  @Prop({ type: String })
  extension: string;
  @Prop({ type: String })
  fullName: string;
  @Prop({ type: String })
  originalName: string;
}

export type PictureDocument = HydratedDocument<PictureModel>;
export const PictureSchema = SchemaFactory.createForClass(PictureModel);
