import { IsAlpha, IsEnum, IsOptional } from 'class-validator';
import { Gender } from '../enums/gender.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsAlpha()
  fullName: string;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;
}
