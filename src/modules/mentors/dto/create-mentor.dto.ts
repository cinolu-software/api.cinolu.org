import CreateUserDto from '@/modules/users/dto/create-user.dto';
import { MentorRequestDto } from './mentor-request.dto';
import { Type } from 'class-transformer';

export class CreateMentorDto {
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @Type(() => CreateUserDto)
  mentor: MentorRequestDto;
}
