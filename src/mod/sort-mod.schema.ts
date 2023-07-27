import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ModType } from './mod.types';
import { ModDocument } from './mod.schema';

@Schema()
export class SortModModel {
  @Prop({ type: String, enum: ModType, default: ModType.MOD })
  type: ModType;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ModModel' }], default: [] })
  mods: ModDocument[];
}

export type SortModDocument = HydratedDocument<SortModModel>;

export const SortModSchema = SchemaFactory.createForClass(SortModModel);
