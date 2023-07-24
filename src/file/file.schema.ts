import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class FileModel {
  @Prop({ type: Number })
  size: number;
  @Prop({ type: String })
  extension: string;
  @Prop({ type: String })
  mimeType: string;
  @Prop({ type: String })
  fullName: string;
  @Prop({ type: String })
  originalName: string;
}

export type FileDocument = HydratedDocument<FileModel>;
export const FileSchema = SchemaFactory.createForClass(FileModel);
