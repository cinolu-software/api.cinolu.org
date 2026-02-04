import { IsArray, IsString } from 'class-validator';

export class GroupParticipantsDto {
  @IsArray()
  @IsString({ each: true })
  ids: string[];

  @IsString()
  phaseId: string;
}
