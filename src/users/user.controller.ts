import { Controller, Get, Param } from '@nestjs/common';

import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  get(@Param() id: string) {
    return this.userService.find(id);
  }
}
