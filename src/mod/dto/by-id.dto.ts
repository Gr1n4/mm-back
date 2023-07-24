import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsMongoId } from 'class-validator';

export class ByIdModDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  @IsDefined()
  id!: string;
}
