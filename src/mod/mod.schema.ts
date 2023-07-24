import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { FileDocument } from 'src/file/file.schema';
import { PictureDocument } from 'src/picture/picture.schema';
import { LangModel, LangModelType } from 'src/utils';

@Schema()
export class ModModel {
  @Prop(raw(LangModel))
  name: LangModelType;
  @Prop(raw(LangModel))
  desc: LangModelType;
  @Prop(raw(LangModel))
  videoUrl: LangModelType;

  @Prop({ type: String })
  cost: string;

  @Prop({ type: String })
  version: string;

  @Prop({ type: Boolean, default: false })
  isNew: boolean;

  @Prop({ type: Boolean, default: false })
  isRevarded: boolean;

  @Prop({ type: Boolean, default: false })
  isRevardedEng: boolean;

  @Prop({ type: Number, default: 0 })
  priority: number;

  @Prop({ type: Number, default: 0 })
  likes: number;

  @Prop({ type: Number, default: 0 })
  downloads: number;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: Types.ObjectId, ref: 'PictureModel' })
  picture: PictureDocument;

  @Prop({ type: Types.ObjectId, ref: 'FileModel' })
  file: FileDocument;
}

export type ModDocument = HydratedDocument<ModModel>;

export const ModSchema = SchemaFactory.createForClass(ModModel);
