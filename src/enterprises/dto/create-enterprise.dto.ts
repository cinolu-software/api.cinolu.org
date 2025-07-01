import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateEnterpriseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  problem_solved: string;

  @IsNotEmpty()
  target_market: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  website: string;

  @IsNotEmpty()
  linkedin_url: string;

  @IsNotEmpty()
  sector: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  founded_at: Date;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  stage: string;
}
