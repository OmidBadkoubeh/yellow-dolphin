import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length, MaxLength, MinLength } from 'class-validator';

import { Gender } from '../enums/gender.enum';

export class CreateUserDto {
  @IsPhoneNumber('IR')
  phoneNumber: string;

  @IsString()
  @Length(4, 50)
  fullName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsDate()
  @Type(() => Date)
  birthday: Date;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  @IsEnum(Gender)
  gender: Gender;
}
