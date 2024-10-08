import { IsEmail } from 'class-validator';

export class forgotPasswordDto {
  @IsEmail({}, { message: "L'adresse email saisi est invalide" })
  email: string;
}
