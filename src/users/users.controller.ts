import { Controller, Get, Param } from '@nestjs/common';

import { UserService } from './users.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  get(@Param() id: string) {
    return this.userService.find(id);
  }
}
