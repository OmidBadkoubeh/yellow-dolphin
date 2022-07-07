import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from '@/users/users.service';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const auth = await this.authService.login(body);
    return auth;
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const auth = await this.authService.register(body);
    return auth;
  }
}
