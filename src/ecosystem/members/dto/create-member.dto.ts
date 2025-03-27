import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  website: string;

  @IsOptional()
  description: string;
}
