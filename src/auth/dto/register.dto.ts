import { IsAlpha, IsDate, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

import { Gender } from '@/users/enums/gender.enum';

export class RegisterDto {
  @IsPhoneNumber('IR')
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @IsAlpha()
  fullName: string;

  @IsDate()
  birthday: Date;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;
}