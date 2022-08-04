import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';

import { UpdateUserDto } from './dto/udpate-user.dto';
import { Role } from './enums/role.enum';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@ApiTags('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOkResponse({ type: User })
  @Get(':id')
  get(@Param('id') id: string) {
    return this.userService.find(id);
  }

  @ApiOkResponse({ type: User })
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @ApiOkResponse({ type: User })
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
