import { IsOptional } from 'class-validator';

export default class AddDetailsDto {
  @IsOptional()
  bio: string;

  @IsOptional()
  socials: { name: string; link: string }[];

  @IsOptional()
  expertises: string[];

  @IsOptional()
  positions: string[];
}
