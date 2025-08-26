import { PartialType } from '@nestjs/swagger';
import CreateUserDto from 'src/core/users/dto/create-user.dto';

export default class UpdateProfileDto extends PartialType<CreateUserDto>(CreateUserDto) {}
