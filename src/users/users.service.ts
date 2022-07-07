import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/udpate-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }

  async find(id: string) {
    const found = await this.findById(id);
    return found;
  }

  async update(id: string, dto: UpdateUserDto) {
    const found = await this.findById(id);
    Object.assign(found, dto);
    return this.userRepository.save(found);
  }

  async delete(id: string) {
    const found = await this.findById(id);
    return this.userRepository.remove(found);
  }

  private async findById(id: string) {
    const found = await this.userRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`User with id: ${id} was not found.`);
    }
    return found;
  }
}
