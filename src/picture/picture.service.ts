import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PictureDocument, PictureModel } from './picture.schema';
import { S3Service } from 'src/s3';
import { Model } from 'mongoose';
import { getInternalPictureByForm } from './picture.utils';
import { BUCKET_PICTURE_NAME } from 'src/constants';
import { MemoryStoredFile } from 'nestjs-form-data';

@Injectable()
export class PictureService {
  constructor(
    private readonly s3Service: S3Service,
    @InjectModel(PictureModel.name) private readonly pictureModel: Model<PictureModel>,
  ) {}

  async create(file: MemoryStoredFile): Promise<PictureDocument> {
    const internalFile = getInternalPictureByForm(file);
    await this.s3Service.uploadFile({
      name: internalFile.fullName,
      buffer: internalFile.buffer,
      bucket: BUCKET_PICTURE_NAME,
    });
    return this.pictureModel.create(internalFile);
  }

  getById(id: string): Promise<PictureDocument | null> {
    return this.pictureModel.findById(id).exec();
  }
}
