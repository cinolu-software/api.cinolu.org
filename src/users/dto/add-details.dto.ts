import { IsOptional } from 'class-validator';

export default class AddDetailsDto {
  @IsOptional()
  bio: string;

  @IsOptional()
  socials: JSON;

  @IsOptional()
  expertises: string[];

  @IsOptional()
  positions: string[];
}
