import { IsOptional } from 'class-validator';

export class ParticipateProjectDto {
  @IsOptional()
  ventureId?: string;
}
