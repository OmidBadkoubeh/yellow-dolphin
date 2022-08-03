import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { User } from '@/users/schemas/user.schema';
import { UsersService } from '@/users/users.service';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @ApiOkResponse({ type: AuthDto })
  @Post('login')
  async login(@Body() body: LoginDto) {
    const auth = await this.authService.login(body);
    return auth;
  }

  @ApiOkResponse({ type: User })
  @Post('register')
  async register(@Body() body: RegisterDto) {
    const auth = await this.authService.register(body);
    return auth;
  }
}
