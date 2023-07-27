import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from 'nestjs-form-data';
import { MAX_FILE_UPLOAD_SIZE, MAX_IMAGE_UPLOAD_SIZE } from 'src/constants';
import { LangDto } from 'src/utils';
import { ModType } from '../mod.types';

export class UpdateModDto {
  @IsEnum(ModType)
  @IsDefined()
  type!: ModType;

  @IsObject()
  @ValidateNested()
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  @Type(() => LangDto)
  name!: LangDto;

  @IsObject()
  @ValidateNested()
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  @Type(() => LangDto)
  desc!: LangDto;

  @IsObject()
  @ValidateNested()
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  @Type(() => LangDto)
  videoUrl!: LangDto;

  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  tags!: string[];

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  version!: string;

  @IsString()
  @IsOptional()
  generationKey?: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  cost!: string;

  @IsBoolean()
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  isNew?: boolean;

  @IsBoolean()
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  isRewarded?: boolean;

  @IsBoolean()
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  isRewardedEng?: boolean;

  @IsInt()
  @Type(() => Number)
  priority?: number;

  @IsFile()
  @MaxFileSize(MAX_FILE_UPLOAD_SIZE)
  @IsOptional()
  file?: MemoryStoredFile;

  @IsFile()
  @MaxFileSize(MAX_IMAGE_UPLOAD_SIZE)
  @HasMimeType(['image/jpeg', 'image/png'])
  @IsOptional()
  picture?: MemoryStoredFile;
}
