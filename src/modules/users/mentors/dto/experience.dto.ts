import { Transform } from 'class-transformer';

export class ExperienceDto {
  company_name: string;
  job_title: string;
  is_current: boolean;

  @Transform(({ value }) => new Date(value))
  start_date: Date;

  @Transform(({ value }) => new Date(value))
  end_date?: Date;
}
