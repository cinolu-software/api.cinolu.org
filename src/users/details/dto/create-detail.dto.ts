import { IsOptional } from 'class-validator';

export class CreateDetailDto {
  @IsOptional()
  bio: string;

  @IsOptional()
  socials: JSON;

  @IsOptional()
  expertises: string[];

  @IsOptional()
  positions: string[];
}
