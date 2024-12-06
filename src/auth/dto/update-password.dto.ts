import { IsNotEmpty, MinLength } from 'class-validator';
import { Match } from '../../shared/decorators/match.decorator';

export class UpdatePasswordDto {
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password: string;

  @IsNotEmpty({ message: 'La confirmation du mot de passe est recquise' })
  @Match('password', { message: 'Les mots de passe ne correspondent pas' })
  password_confirm: string;
}
