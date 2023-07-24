import { Types } from 'mongoose';
import { getMinioObjectUrl } from 'src/utils';

interface PictureFields {
  _id: Types.ObjectId;
  width: number;
  height: number;
  size: number;
  extension: string;
  fullName: string;
  originalName: string;
}

export class PictureEntity {
  id: string;
  width: number;
  height: number;
  size: number;
  extension: string;
  fullName: string;
  originalName: string;
  url: string;

  constructor({ _id, width, height, size, extension, fullName, originalName }: PictureFields) {
    this.id = _id.toString();
    this.width = width;
    this.height = height;
    this.size = size;
    this.extension = extension;
    this.fullName = fullName;
    this.originalName = originalName;
    this.url = getMinioObjectUrl(fullName);
  }
}
