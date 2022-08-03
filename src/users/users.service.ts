import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/udpate-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

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
    const found = await this.userModel.findOne({ where: { phoneNumber } });
    return found;
  }

  async findByEmail(email: string) {
    const found = await this.userModel.findOne({ where: { email } });
    if (!found) {
      throw new NotFoundException(`User with email: ${email} was not found.`);
    }
    return found;
  }

  private async findById(id: string) {
    const found = await this.userModel.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`User with id: ${id} was not found.`);
    }
    return found;
  }
}
