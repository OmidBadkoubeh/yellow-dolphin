import { Controller, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './users/enums/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health-check')
  healthCheck() {
    return this.appService.healthCheck();
  }
}
