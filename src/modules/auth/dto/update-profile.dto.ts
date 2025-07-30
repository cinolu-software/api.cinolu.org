import { IsNotEmpty } from 'class-validator';

export default class UpdateProfileDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  address: string;
}
