import { PartialType } from '@nestjs/mapped-types';
import CreateUserDto from 'src/core/users/dto/create-user.dto';

export default class UpdateProfileDto extends PartialType<CreateUserDto>(CreateUserDto) {}
