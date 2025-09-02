import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Match } from 'src/shared/decorators/match.decorator';

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
  city: string;

  @IsNotEmpty()
  birth_date: Date;

  @IsNotEmpty()
  country: string;

  @IsOptional()
  reason: string;

  @IsOptional()
  biography: string;

  @MinLength(6)
  password: string;

  @Match('password')
  password_confirm: string;

  @IsOptional()
  referral_code: string;
}
