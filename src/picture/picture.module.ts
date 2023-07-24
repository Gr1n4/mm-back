import { Module } from '@nestjs/common';
import { S3Module } from 'src/s3';
import { PictureService } from './picture.service';
import { PictureModel, PictureSchema } from './picture.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: PictureModel.name, schema: PictureSchema }]), S3Module],
  providers: [PictureService],
  exports: [PictureService],
})
export class PictureModule {}
