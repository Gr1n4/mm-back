import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/guards';
import { UserRole } from 'src/user/user.types';

export function Auth(role: UserRole = UserRole.MANAGER) {
  return applyDecorators(SetMetadata('role', role), UseGuards(AuthGuard));
}
