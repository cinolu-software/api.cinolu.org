import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export default class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  biography: string;

  @IsOptional()
  positions: string[];

  @IsOptional()
  expertises: string[];

  @IsNotEmpty()
  roles: string[];
}
