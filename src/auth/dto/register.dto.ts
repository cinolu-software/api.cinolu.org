import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Match } from '../decorators/match.decorator';

export class SignupDto {
  @MinLength(3, { message: 'Le prénom doit contenir au-moins 3 caractères' })
  first_name: string;

  @MinLength(3, { message: 'Le nom doit contenir au-moins 3 caractères' })
  last_name: string;

  @IsEmail({}, { message: "L'email saisi est invalide" })
  email: string;

  @MinLength(4, {
    message: 'Le mot de passe doit contenir au-moins 4 caractères'
  })
  password: string;

  @Match('password', { message: 'Les mots de passe ne correspondent pas' })
  password_confirm: string;

  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  name: string;

  @MinLength(7, { message: 'Minimum 10 caractères' })
  phone_number: string;

  @IsNotEmpty({ message: "L'adresse est obligatoire" })
  address: string;
}
