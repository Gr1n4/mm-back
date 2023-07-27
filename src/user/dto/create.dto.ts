import { IsDefined, IsEmail, IsEnum } from 'class-validator';
import { UserRole } from '../user.types';

export class UserCreateDto {
  @IsEmail()
  @IsDefined()
  email!: string;

  @IsEnum(UserRole)
  @IsDefined()
  role!: UserRole;
}
