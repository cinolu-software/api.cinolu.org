import { IsOptional, IsString } from 'class-validator';

export class ParticipateProjectDto {
  @IsString()
  projectId: string;

  @IsOptional()
  ventureId?: string;
}
