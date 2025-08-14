import { IsNotEmpty, MinLength } from 'class-validator';
import { Match } from '../../../shared/decorators/match.decorator';

export class UpdatePasswordDto {
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @Match('password')
  password_confirm: string;
}
