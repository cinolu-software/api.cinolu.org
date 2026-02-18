import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class MoveParticipantsDto {
  @IsArray()
  @IsString({ each: true })
  ids: string[];

  @IsUUID()
  phaseId: string;

  @IsOptional()
  @IsUUID()
  fromPhaseId?: string;
}
