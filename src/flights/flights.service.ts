import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/users/entities/user.entity';

import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Flight } from './schemas/flight.schema';

@Injectable()
export class FlightsService {
  constructor(@InjectRepository(Flight) private readonly flightRepo: Repository<Flight>) {}

  async create(createFlightDto: CreateFlightDto) {
    const newFlight = this.flightRepo.create(createFlightDto);
    return newFlight;
  }

  async findAll() {
    const [flights, count] = await this.flightRepo.findAndCount({ cache: 5000 });
    return { flights, count };
  }

  async findOne(id: number) {
    const found = await this.flightRepo.findOne(id);

    if (!found) {
      throw new NotFoundException(`Flight with id ${id} not found`);
    }

    return found;
  }

  async update(id: number, updateFlightDto: UpdateFlightDto) {
    const found = await this.flightRepo.findOne(id);
    Object.assign(found, updateFlightDto);
    return await this.flightRepo.save(found);
  }

  async remove(id: number) {
    const found = await this.flightRepo.findOne(id);
    return await this.flightRepo.remove(found);
  }

  async bookFlight(id: number, user: User) {
    const flight = await this.flightRepo.findOne(id);

    if (flight.bookers.length >= flight.passengersCount) {
      throw new HttpException('Flight is full', 400);
    }

    flight.bookers.push(user);
    return await this.flightRepo.save(flight);
  }

  async cancelFlight(id: number, userId: number) {
    const flight = await this.flightRepo.findOne(id);
    flight.bookers = flight.bookers.filter((b) => b.id !== userId.toString());
    return await this.flightRepo.save(flight);
  }
}
