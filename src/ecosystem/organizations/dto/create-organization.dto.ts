import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrganizationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  website: string;

  @IsNotEmpty()
  location: string;

  @IsOptional()
  description: string;
}
