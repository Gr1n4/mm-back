import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { AwsSdkModule } from 'nest-aws-sdk';

@Module({
  imports: [AwsSdkModule],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
