import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { AdminGuard } from '@/common/guards/admin.guard';
import { User } from '@/users/schemas/user.schema';

import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { FlightsService } from './flights.service';
import { Flight } from './schemas/flight.schema';

@ApiTags('flights')
@UseGuards(JwtAuthGuard)
@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @ApiResponse({ status: 200, type: Flight })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightsService.findOne(id);
  }

  @ApiResponse({ status: 200, type: [Flight] })
  @Get()
  findAll() {
    return this.flightsService.findAll();
  }

  @ApiResponse({ status: 200, type: Flight })
  @Get('/:id/bookFlight')
  bookFlight(@Param('id') id: string, @CurrentUser() user: User) {
    return this.flightsService.bookFlight(id, user);
  }

  @ApiResponse({ status: 201, type: Flight })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightsService.create(createFlightDto);
  }

  @ApiResponse({ status: 200, type: Flight })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightsService.update(id, updateFlightDto);
  }

  @ApiResponse({ status: 200, type: Flight })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightsService.remove(id);
  }
}
