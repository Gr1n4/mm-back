import { IsDefined, IsEmail, IsString } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsDefined()
  password!: string;
}
