import { Request } from 'express';

import { User } from '@/users/schemas/user.schema';

export type RequestType = {
  user?: User;
} & Request;
