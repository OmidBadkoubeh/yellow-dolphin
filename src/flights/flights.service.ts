import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { User } from '@/users/schemas/user.schema';

import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Flight, FlightDocument } from './schemas/flight.schema';

@Injectable()
export class FlightsService {
  constructor(@InjectModel(Flight.name) private readonly flightModel: Model<FlightDocument>) {}

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
    const flight = await this.findById(id);
    if (flight.bookers.length >= flight.passengersCount) {
      throw new HttpException('Flight is full', 400);
    }
    flight.bookers.push(user);
    const updated = await this.flightModel.findByIdAndUpdate(id, flight, { overwrite: true });
    return updated;
  }

  async cancelFlight(flightId: string, userId: string) {
    const flight = await this.findById(flightId);
    const filteredFlights = flight.bookers.filter((b) => b._id !== new Types.ObjectId(userId));
    flight.set('bookers', filteredFlights);
    return flight;
  }

  private async findById(id: string) {
    const found = await this.flightModel.findOne().where('_id').equals(id);
    if (!found) {
      throw new NotFoundException(`Flight with id: ${id} was not found.`);
    }
    return found;
  }
}
