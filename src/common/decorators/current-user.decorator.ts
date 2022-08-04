import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { RequestType } from '@/common/types/request.type';

export const CurrentUser = createParamDecorator((data: never, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<RequestType>();
  return request?.user || null;
});
