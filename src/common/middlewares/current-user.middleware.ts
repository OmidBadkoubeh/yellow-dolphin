import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

import { RequestType } from '@/common/types/request.type';
import { LoggerService } from '@/logger/logger.service';
import { UsersService } from '@/users/users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: LoggerService = new Logger(CurrentUserMiddleware.name),
  ) {}

  async use(request: RequestType, response: Response, next: NextFunction) {
    const { id } = request.user || {};

    if (id) {
      const user = await this.usersService.find(id.toString());
      request.user = user;
    }

    next();
  }
}
