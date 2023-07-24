import { MemoryStoredFile } from 'nestjs-form-data';
import { v4 } from 'uuid';

export interface InternalFile {
  originalName: string;
  name: string;
  fullName: string;
  extension: string;
  buffer: Buffer;
  size: number;
  mimeType: string;
}

export function getInternalFileByForm(memoryStoredFile: MemoryStoredFile): InternalFile {
  const { originalName, buffer, size } = memoryStoredFile;
  const name = v4();
  const fullName = `${name}.${memoryStoredFile.extension}`;
  return {
    originalName,
    name,
    extension: memoryStoredFile.extension,
    buffer,
    size,
    fullName,
    mimeType: memoryStoredFile.mimeType,
  };
}
