import { MemoryStoredFile } from 'nestjs-form-data';
import sizeOf from 'image-size';
import { v4 } from 'uuid';
import { InternalServerErrorException } from '@nestjs/common';

export interface InternalPicture {
  originalName: string;
  name: string;
  fullName: string;
  extension: string;
  buffer: Buffer;
  width: number;
  height: number;
  size: number;
}

export function getInternalPictureByForm({ originalName, buffer, size }: MemoryStoredFile): InternalPicture {
  const { width, height, type } = sizeOf(buffer);
  const name = v4();
  if (!width || !height || !type) {
    throw new InternalServerErrorException();
  }
  const fullName = `${name}.${type}`;
  return {
    originalName,
    name,
    extension: type,
    buffer,
    width,
    height,
    size,
    fullName,
  };
}
