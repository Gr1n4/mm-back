import { BUCKET_PICTURE_NAME } from 'src/constants';

export function getMinioObjectUrl(name: string, bucket = BUCKET_PICTURE_NAME): string {
  if (process.env.NODE_ENV === 'production') {
    return `https://${bucket}.${process.env.MINIO_URL}/${name}`;
  }
  return `http://${process.env.MINIO_URL}/${bucket}/${name}`;
}
