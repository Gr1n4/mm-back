import { CanActivate, ExecutionContext, Inject, Injectable, forwardRef } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_TOKEN } from 'src/constants';
import { SessionService } from 'src/session/session.service';
import { UserRole } from 'src/user/user.types';

const roleMap = {
  [UserRole.MANAGER]: 0,
  [UserRole.ADMIN]: 1,
  [UserRole.SUPER_ADMIN]: 2,
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => SessionService))
    private readonly sessionService: SessionService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<UserRole>('role', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const sessionId = request.cookies[AUTH_TOKEN];
    if (!sessionId) {
      return false;
    }
    const session = await this.sessionService.getById(sessionId);
    if (session === null || session.isExpired || !session.user) {
      return false;
    }
    if (roleMap[session.user.role] < roleMap[role]) {
      return false;
    }
    request.session = session;
    return true;
  }
}
