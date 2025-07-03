import { IsNotEmpty, MinLength } from 'class-validator';
import { Match } from '../../shared/decorators/match.decorator';

export class ResetPasswordDto {
  @IsNotEmpty()
  token: string;

  @MinLength(6)
  password: string;

  @Match('password')
  password_confirm: string;
}
