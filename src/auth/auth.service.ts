import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { validate } from 'class-validator';

import { LoggerService } from '@/logger/logger.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UsersService } from '@/users/users.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: LoggerService = new Logger(AuthService.name),
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(dto: LoginDto) {
    const found = await this.findUserByPhoneNumber(dto.phoneNumber);
    const isPasswordCorrect = await compare(dto.password, found.password);
    if (!isPasswordCorrect) {
      throw new BadRequestException('Incorrect password');
    }
    const token = this.jwtService.sign({ id: found.id });
    return { token };
  }

  async register(dto: RegisterDto) {
    const existingUser = await this.userService.findByPhoneNumber(dto.phoneNumber);
    if (existingUser) {
      throw new BadRequestException(`User with phone number '${dto.phoneNumber}' already exists.`);
    }

    const userDto = await this.createUserDto(dto);
    const newUser = await this.userService.create(userDto);
    return newUser;
  }

  private async findUserByPhoneNumber(phoneNumber: string) {
    const user = await this.userService.findByPhoneNumber(phoneNumber);
    if (!user) {
      throw new NotFoundException(`User with phone number '${phoneNumber}' not found.`);
    }
    return user;
  }

  private async createUserDto(dto: RegisterDto) {
    let isOk = false;

    const hashedPassword = await hash(dto.password, SALT_ROUNDS);
    const userDTO = new CreateUserDto();
    userDTO.phoneNumber = dto.phoneNumber;
    userDTO.password = hashedPassword;
    userDTO.birthday = new Date(dto.birthday);
    userDTO.fullName = dto.fullName;
    userDTO.gender = dto?.gender;

    await validate(userDTO).then((errors) => {
      if (errors.length > 0) {
        this.logger.debug(`${errors}`);
      } else {
        isOk = true;
      }
    });

    if (!isOk) {
      throw new BadRequestException();
    }

    return userDTO;
  }
}
