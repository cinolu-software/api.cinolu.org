import CreateUserDto from '@/modules/users/dto/create-user.dto';
import { MentorRequestDto } from './mentor-request.dto';

export class CreateMentorDto {
  user: CreateUserDto;
  mentor: MentorRequestDto;
}
