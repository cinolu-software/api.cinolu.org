import { Type } from 'class-transformer';
import { IsArray, IsEnum, ValidateNested } from 'class-validator';
import { ExperienceDto } from './experience.dto';
import { MentorStatus } from '../../enums/mentor.enum';

export class CreateMentorDto {
  years_experience: number;

  @IsEnum(MentorStatus)
  status: MentorStatus;

  expertises: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experiences: ExperienceDto[];
}
