import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('jwt') {}

export const AuthenticationGuard = () => UseGuards(new LocalAuthGuard());
