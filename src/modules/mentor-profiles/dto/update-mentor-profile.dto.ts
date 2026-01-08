import { PartialType } from '@nestjs/swagger';
import { CreateMentorProfileDto } from './create-mentor-profile.dto';

export class UpdateMentorProfileDto extends PartialType(CreateMentorProfileDto) {}
