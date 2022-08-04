import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { Flight } from './schemas/flight.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Flight])],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}
