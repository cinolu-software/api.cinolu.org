import { IsOptional, IsUUID } from 'class-validator';

export class ParticipateProjectDto {
  @IsOptional()
  @IsUUID()
  ventureId?: string;
}
