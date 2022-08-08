import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateFlightDto {
  /**
   * @description Flight name
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * @description Flight date
   */
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  /**
   * @description Flight starting city
   */
  @IsString()
  @IsNotEmpty()
  from: string;

  /**
   * @description Flight destination city
   */
  @IsString()
  @IsNotEmpty()
  to: string;

  /**
   * @description Flight max passengers
   */
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(1)
  maxPassengers: number;
}
