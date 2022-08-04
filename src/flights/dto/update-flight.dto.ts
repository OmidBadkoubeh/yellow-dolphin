import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsOptional, IsString } from 'class-validator';

import { CreateFlightDto } from './create-flight.dto';

export class UpdateFlightDto extends PartialType(CreateFlightDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  from?: string;

  @IsString()
  @IsOptional()
  to?: string;

  @IsDateString()
  @IsOptional()
  @Type(() => Date)
  date?: Date;
}
