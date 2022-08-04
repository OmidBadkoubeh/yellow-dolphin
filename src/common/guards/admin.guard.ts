import { CanActivate, ExecutionContext } from '@nestjs/common';

import { RequestType } from '@/common/types/request.type';
import { Role } from '@/users/enums/role.enum';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestType>();
    const user = request.user;
    return user && user.roles.includes(Role.Admin);
  }
}
