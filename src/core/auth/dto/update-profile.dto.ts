import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export default class UpdateProfileDto {
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
  biography: string;
}
