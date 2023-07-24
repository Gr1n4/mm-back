import { Module } from '@nestjs/common';
import { S3Module } from 'src/s3/s3.module';
import { FileService } from './file.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModel, FileSchema } from './file.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: FileModel.name, schema: FileSchema }]), S3Module],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
