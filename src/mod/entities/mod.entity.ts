import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { FileEntity } from 'src/file/entities/file.entity';
import { FileDocument } from 'src/file/file.schema';
import { PictureEntity } from 'src/picture';
import { PictureDocument } from 'src/picture/picture.schema';
import { LangModel, LangModelType } from 'src/utils';
import { Option } from 'src/types';
import { ModType } from '../mod.types';

interface ModFields {
  readonly _id: Types.ObjectId;
  readonly type: ModType;
  readonly name: LangModelType;
  readonly desc: LangModelType;
  readonly videoUrl: LangModelType;
  readonly generationKey?: string;
  readonly version: string;
  readonly cost: string;
  readonly isNew: boolean;
  readonly isRewarded: boolean;
  readonly isRewardedEng: boolean;
  readonly likes: number;
  readonly downloads: number;
  readonly priority: number;
  readonly tags: string[];
  readonly picture: PictureDocument;
  readonly file: Option<FileDocument>;
}

export class ModEntity {
  @ApiProperty({ type: String, description: 'Mongodb ObjectId' })
  readonly id: string;
  @ApiProperty({ type: LangModel })
  readonly name: LangModelType;
  @ApiProperty({ type: LangModel })
  readonly desc: LangModelType;
  readonly type: ModType;
  readonly videoUrl: LangModelType;
  readonly version: string;
  readonly generationKey?: string;
  readonly cost: string;
  readonly isNew: boolean;
  readonly isRewarded: boolean;
  readonly isRewardedEng: boolean;
  readonly likes: number;
  readonly downloads: number;
  readonly priority: number;
  readonly tags: string[];
  readonly picture: PictureEntity;
  readonly file: Option<FileEntity>;

  constructor({
    _id,
    type,
    name,
    desc,
    videoUrl,
    generationKey,
    version,
    cost,
    isNew,
    isRewarded,
    isRewardedEng,
    likes,
    downloads,
    priority,
    tags,
    picture,
    file,
  }: ModFields) {
    this.id = _id.toString();
    this.type = type;
    this.name = name;
    this.desc = desc;
    this.videoUrl = videoUrl;
    this.generationKey = generationKey;
    this.version = version;
    this.cost = cost;
    this.isNew = isNew;
    this.isRewarded = isRewarded;
    this.isRewardedEng = isRewardedEng;
    this.likes = likes;
    this.downloads = downloads;
    this.priority = priority;
    this.tags = tags;
    this.picture = new PictureEntity(picture);
    this.file = file ? new FileEntity(file) : null;
  }
}
