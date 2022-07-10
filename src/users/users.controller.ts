import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';

import { UpdateUserDto } from './dto/udpate-user.dto';
import { Role } from './enums/role.enum';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  get(@Param('id') id: string) {
    return this.userService.find(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
