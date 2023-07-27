import { IsMongoId, IsString } from 'class-validator';

export class AuthCompleteRegisterStaffDto {
  @IsMongoId()
  readonly authId!: string;

  @IsString()
  readonly password!: string;
}
