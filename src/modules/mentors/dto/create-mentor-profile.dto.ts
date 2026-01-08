import { Type } from 'class-transformer';
import { CreateExperienceDto } from './create-experience.dto';
import { IsArray, ValidateNested } from 'class-validator';

export class CreateMentorProfileDto {
  years_experience: number;
  expertises: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExperienceDto)
  experiences: CreateExperienceDto[];
}
