import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { S3Service } from 'src/s3';
import { FileDocument, FileModel } from './file.schema';
import { Model } from 'mongoose';
import { MemoryStoredFile } from 'nestjs-form-data';
import { getInternalFileByForm } from './file.utils';
import { BUCKET_FILE_NAME } from 'src/constants';

@Injectable()
export class FileService {
  constructor(
    private readonly s3Service: S3Service,
    @InjectModel(FileModel.name) private readonly fileModel: Model<FileModel>,
  ) {}

  async create(file: MemoryStoredFile): Promise<FileDocument> {
    const internalFile = getInternalFileByForm(file);
    await this.s3Service.uploadFile({
      name: internalFile.fullName,
      buffer: internalFile.buffer,
      bucket: BUCKET_FILE_NAME,
    });
    return this.fileModel.create(internalFile);
  }

  getById(id: string): Promise<FileDocument | null> {
    return this.fileModel.findById(id).exec();
  }
}
