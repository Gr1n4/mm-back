import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { FileEntity } from 'src/file/entities/file.entity';
import { FileDocument } from 'src/file/file.schema';
import { PictureEntity } from 'src/picture';
import { PictureDocument } from 'src/picture/picture.schema';
import { LangModel, LangModelType } from 'src/utils';

interface ModFields {
  readonly _id: Types.ObjectId;
  readonly name: LangModelType;
  readonly desc: LangModelType;
  readonly videoUrl: LangModelType;
  readonly version: string;
  readonly cost: string;
  readonly isNew: boolean;
  readonly isRevarded: boolean;
  readonly isRevardedEng: boolean;
  readonly likes: number;
  readonly downloads: number;
  readonly priority: number;
  readonly tags: string[];
  readonly picture: PictureDocument;
  readonly file: FileDocument;
}

export class ModEntity {
  @ApiProperty({ type: String, description: 'Mongodb ObjectId' })
  readonly id: string;
  @ApiProperty({ type: LangModel })
  readonly name: LangModelType;
  @ApiProperty({ type: LangModel })
  readonly desc: LangModelType;
  readonly videoUrl: LangModelType;
  readonly version: string;
  readonly cost: string;
  readonly isNew: boolean;
  readonly isRevarded: boolean;
  readonly isRevardedEng: boolean;
  readonly likes: number;
  readonly downloads: number;
  readonly priority: number;
  readonly tags: string[];
  readonly picture: PictureEntity;
  readonly file: FileEntity;

  constructor({
    _id,
    name,
    desc,
    videoUrl,
    version,
    cost,
    isNew,
    isRevarded,
    isRevardedEng,
    likes,
    downloads,
    priority,
    tags,
    picture,
    file,
  }: ModFields) {
    this.id = _id.toString();
    this.name = name;
    this.desc = desc;
    this.videoUrl = videoUrl;
    this.version = version;
    this.cost = cost;
    this.isNew = isNew;
    this.isRevarded = isRevarded;
    this.isRevardedEng = isRevardedEng;
    this.likes = likes;
    this.downloads = downloads;
    this.priority = priority;
    this.tags = tags;
    this.picture = new PictureEntity(picture);
    this.file = new FileEntity(file);
  }
}
