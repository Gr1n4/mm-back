import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { FileDocument } from 'src/file/file.schema';
import { PictureDocument } from 'src/picture/picture.schema';
import { LangModel, LangModelType } from 'src/utils';
import { ModType } from './mod.types';

@Schema()
export class ModModel {
  @Prop(raw(LangModel))
  name: LangModelType;
  @Prop(raw(LangModel))
  desc: LangModelType;
  @Prop(raw(LangModel))
  videoUrl: LangModelType;

  @Prop({ type: String, enum: ModType, default: ModType.MOD })
  type: ModType;

  @Prop({ type: String })
  cost: string;

  @Prop({ type: String })
  version: string;

  // NOTE (luchko): used only for type seed.
  @Prop({ type: String })
  generationKey: string;

  @Prop({ type: Boolean, default: false })
  isNew: boolean;

  @Prop({ type: Boolean, default: false })
  isRewarded: boolean;

  @Prop({ type: Boolean, default: false })
  isRewardedEng: boolean;

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
