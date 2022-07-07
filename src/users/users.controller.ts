import { Controller, Get, Param } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  get(@Param() id: string) {
    return this.userService.find(id);
  }
}
