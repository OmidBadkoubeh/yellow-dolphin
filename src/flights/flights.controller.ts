import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { FlightsService } from './flights.service';
import { Flight } from './schemas/flight.schema';

@ApiTags('flights')
@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @ApiResponse({ status: 200, type: Flight })
  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightsService.create(createFlightDto);
  }

  @ApiResponse({ status: 200, type: [Flight] })
  @Get()
  findAll() {
    return this.flightsService.findAll();
  }

  @ApiResponse({ status: 200, type: Flight })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightsService.findOne(id);
  }

  @ApiResponse({ status: 200, type: Flight })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightsService.update(id, updateFlightDto);
  }

  @ApiResponse({ status: 200, type: Flight })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightsService.remove(id);
  }
}
