import { OmitType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { UserCreateDto } from 'src/user';

export class AuthRegisterSuperDto extends OmitType(UserCreateDto, ['role'] as const) {
  @IsString()
  password!: string;
}
