import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

import { Gender } from '@/users/enums/gender.enum';

export class RegisterDto {
  @IsPhoneNumber('IR')
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  password: string;

  @IsString()
  @Length(4, 50)
  fullName: string;

  @IsDateString()
  birthday: Date;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsEmail()
  email: string;
}
