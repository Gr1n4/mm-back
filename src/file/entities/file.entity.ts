import { Types } from 'mongoose';
import { BUCKET_FILE_NAME } from 'src/constants';
import { getMinioObjectUrl } from 'src/utils';

interface FileFields {
  _id: Types.ObjectId;
  size: number;
  extension: string;
  mimeType: string;
  fullName: string;
  originalName: string;
}

export class FileEntity {
  id: string;
  size: number;
  extension: string;
  mimeType: string;
  fullName: string;
  originalName: string;
  url: string;

  constructor({ _id, size, extension, mimeType, fullName, originalName }: FileFields) {
    this.id = _id.toString();
    this.size = size;
    this.extension = extension;
    this.mimeType = mimeType;
    this.fullName = fullName;
    this.originalName = originalName;
    this.url = getMinioObjectUrl(fullName, BUCKET_FILE_NAME);
  }
}
