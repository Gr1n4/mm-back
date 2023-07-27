import { IsArray, IsMongoId } from 'class-validator';

export class ModSortedUpdateDto {
  @IsArray()
  @IsMongoId({ each: true })
  modIds: string[];
}
