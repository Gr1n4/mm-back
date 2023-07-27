import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../user.types';
import { Transform } from 'class-transformer';

export class UserFeedDto {
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsEnum(UserRole, { each: true })
  @IsOptional()
  role?: UserRole[];
}
