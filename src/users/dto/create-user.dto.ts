import { IsAlpha, IsDate, IsEnum, IsNotEmpty, IsPhoneNumber, MaxLength, MinLength } from 'class-validator';

import { Gender } from '../enums/gender.enum';

export class CreateUserDto {
  @IsPhoneNumber('IR')
  phoneNumber: string;

  @IsAlpha()
  fullName: string;

  @IsDate()
  birthday: Date;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  @IsEnum(Gender)
  gender: Gender;
}
