import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  birth_date: Date;

  @IsNotEmpty()
  country: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  referral_code: string;
}
