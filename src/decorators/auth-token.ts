import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AUTH_TOKEN } from 'src/constants';

export const AuthToken = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.cookies[AUTH_TOKEN] || '';
});
