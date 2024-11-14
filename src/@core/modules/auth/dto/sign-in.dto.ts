import { IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: "L'email saisi est invalide" })
  email: string;

  @MinLength(4, { message: 'Le mot de passe doit contenir au-moins 4 caractères' })
  password: string;
}
