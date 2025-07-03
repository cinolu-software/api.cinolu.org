import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  name: string;
}
