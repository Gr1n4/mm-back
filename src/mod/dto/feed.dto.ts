import { IsOptional, IsString } from 'class-validator';

export class FeedModDto {
  @IsOptional()
  @IsString()
  name?: string;
}
