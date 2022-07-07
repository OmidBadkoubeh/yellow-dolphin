import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';

import { UpdateUserDto } from './dto/udpate-user.dto';
import { UsersService } from './users.service';

@Controller()
export class UserController {
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
