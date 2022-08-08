import { HttpException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
    return await newFlight.save();
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
    return await found.save();
  }

  async remove(id: string) {
    const found = await this.flightModel.findOneAndDelete({ _id: id });
    return await found.save();
  }

  async bookFlight(id: string, user: User) {
    const flight = await this.findById(id);

    const flightBookers = flight.bookers as unknown as string[];

    if (flightBookers.length >= flight.maxPassengers) {
      throw new HttpException('Flight is full', 400);
    }

    if (flightBookers.includes(user._id)) {
      throw new HttpException('You already booked this flight', 400);
    }

    flightBookers.push(user._id);
    flight.bookers = flightBookers as unknown as User[];
    return await flight.save();
  }

  async cancelFlight(flightId: string, user: User) {
    const flight = await this.findById(flightId);
    await flight.populate({ path: 'bookers', select: '_id' });
    flight.bookers = flight.bookers.filter((booker) => booker._id !== user._id);
    return await flight.save();
  }

  private async findById(id: string) {
    const found = await this.flightModel.findOne().where('_id').equals(id);
    if (!found) {
      throw new NotFoundException(`Flight with id: ${id} was not found.`);
    }
    return found;
  }
}
