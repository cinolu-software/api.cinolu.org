import { IsOptional } from 'class-validator';

export default class AddDetailDto {
  @IsOptional()
  bio: string;

  @IsOptional()
  social_name: string;

  @IsOptional()
  social_value: string;
}
