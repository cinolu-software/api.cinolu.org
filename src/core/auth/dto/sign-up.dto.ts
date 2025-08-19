import { PartialType } from '@nestjs/swagger';
import { MinLength } from 'class-validator';
import CreateUserDto from 'src/core/users/dto/create-user.dto';
import { Match } from 'src/shared/decorators/match.decorator';

export class SignUpDto extends PartialType<CreateUserDto>(CreateUserDto) {
  @MinLength(6)
  password: string;

  @Match('password')
  password_confirm: string;
}
