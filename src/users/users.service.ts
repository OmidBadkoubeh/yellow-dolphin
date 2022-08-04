import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LoggerService } from '@/logger/logger.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/udpate-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly logger: LoggerService = new Logger(UsersService.name),
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.userModel.create(dto);
    return user;
  }

  async find(id: string) {
    const found = await this.findById(id);
    return found;
  }

  async update(id: string, dto: UpdateUserDto) {
    const found = await this.findById(id);
    Object.assign(found, dto);
    return await this.userModel.findByIdAndUpdate(id, found, { overwrite: true });
  }

  async delete(id: string) {
    const found = await this.userModel.findByIdAndDelete(id);
    if (!found) {
      throw new NotFoundException(`User with id: ${id} was not found.`);
    }
    return found;
  }

  async findByPhoneNumber(phoneNumber: string) {
    const found = await this.userModel.findOne().where('phoneNumber').equals(phoneNumber);
    return found;
  }

  async findByEmail(email: string) {
    const found = await this.userModel.findOne().where('email').equals(email);
    if (!found) {
      this.logger.error(`User with email: ${email} was not found.`);
      throw new NotFoundException(`User with email: ${email} was not found.`);
    }
    return found;
  }

  private async findById(id: string) {
    const found = await this.userModel.findById(id);
    if (!found) {
      this.logger.error(`User with id: ${id} was not found.`);
      throw new NotFoundException(`User with id: ${id} was not found.`);
    }
    return found;
  }
}
