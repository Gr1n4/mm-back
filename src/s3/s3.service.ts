import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import { BUCKET_PICTURE_NAME } from 'src/constants';
import { S3File } from './s3.types';

@Injectable()
export class S3Service {
  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  async uploadFile({ buffer, name, bucket = BUCKET_PICTURE_NAME }: S3File): Promise<S3.ManagedUpload.SendData> {
    const params: S3.PutObjectRequest = {
      Bucket: bucket,
      Key: name,
      Body: buffer,
    };
    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err, data) => {
        if (err) {
          console.log('[UPLOAD_FILE] -> err: %o', err);
          return reject(err);
        }
        console.log('[UPLOAD_FILE] -> data: %o', data);
        return resolve(data);
      });
    });
  }
}
