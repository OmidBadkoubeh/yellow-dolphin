import { HttpException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { LoggerService } from '@/logger/logger.service';
import { User } from '@/users/schemas/user.schema';

import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Flight, FlightDocument } from './schemas/flight.schema';

@Injectable()
export class FlightsService {
  constructor(
    @InjectModel(Flight.name) private readonly flightModel: Model<FlightDocument>,
    private readonly logger: LoggerService = new Logger(FlightsService.name),
  ) {}

  async create(createFlightDto: CreateFlightDto) {
    const newFlight = await this.flightModel.create(createFlightDto);
    return newFlight;
  }

  async findAll() {
    const flights = await this.flightModel.find();
    return { flights, count: flights.length };
  }

  async findOne(id: string) {
    const found = await this.findById(id);
    return found;
  }

  async update(id: string, updateFlightDto: UpdateFlightDto) {
    const found = await this.flightModel.findByIdAndUpdate(id, updateFlightDto, { overwrite: true });
    return found;
  }

  async remove(id: string) {
    const found = await this.flightModel.findOneAndDelete().where('id').equals(id);
    return found;
  }

  async bookFlight(id: string, user: User) {
    const found = await this.findById(id);
    const flight = await found.populate('bookers');

    if (flight.bookers.length >= flight.maxPassengers) {
      throw new HttpException('Flight is full', 400);
    }

    if (flight.bookers.findIndex((b) => b._id.toString() === user._id.toString()) !== -1) {
      throw new HttpException('You already booked this flight', 400);
    }

    flight.bookers.push(user);
    const updated = await this.flightModel.findByIdAndUpdate(id, flight, { overwrite: true });
    return await updated.save();
  }

  async cancelFlight(flightId: string, userId: string) {
    const flight = await this.findById(flightId);
    await flight.populate('bookers');
    const filteredFlights = flight.bookers.filter((b) => b._id !== new Types.ObjectId(userId));
    await flight.set('bookers', filteredFlights).save();
    return flight;
  }

  private async findById(id: string) {
    const found = await this.flightModel.findOne().where('_id').equals(id);
    this.logger.log(found);
    if (!found) {
      throw new NotFoundException(`Flight with id: ${id} was not found.`);
    }
    return found;
  }
}
