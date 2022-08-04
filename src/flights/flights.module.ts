import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LoggerService } from '@/logger/logger.service';

import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { Flight, FlightSchema } from './schemas/flight.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }])],
  controllers: [FlightsController],
  providers: [FlightsService, LoggerService],
})
export class FlightsModule {}
