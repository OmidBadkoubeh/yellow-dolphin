import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from '@/users/users.service';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @Post('login')
  async login(@Body() body) {
    const auth = await this.authService.login(body);
    return auth;
  }

  @Post('register')
  async register(@Body() body) {
    const auth = await this.authService.register(body);
    return auth;
  }
}
