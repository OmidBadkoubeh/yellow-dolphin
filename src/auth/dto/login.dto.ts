import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsPhoneNumber('IR')
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
