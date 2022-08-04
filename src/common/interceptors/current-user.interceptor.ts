import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { RequestType } from '@/common/types/request.type';
import { UsersService } from '@/users/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest<RequestType>();
    const { _id } = request.user || {};

    if (_id) {
      const user = await this.usersService.find(_id.toString());
      request.user = user;
    }

    return handler.handle();
  }
}
