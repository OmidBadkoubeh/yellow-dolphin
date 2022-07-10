import { OmitType } from '@nestjs/mapped-types';
import { IsEmail } from 'class-validator';

import { LoginDto } from './login.dto';

export class LoginWithEmailDto extends OmitType(LoginDto, ['phoneNumber']) {
  @IsEmail()
  email: string;
}
