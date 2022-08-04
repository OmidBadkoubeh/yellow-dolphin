import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class LocalAuthGuard extends AuthGuard('jwt') {}

export const AuthenticationGuard = () => UseGuards(new LocalAuthGuard());
