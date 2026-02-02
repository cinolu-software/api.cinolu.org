import { IsArray, IsString } from 'class-validator';

export class GroupUsersPhaseDto {
  @IsArray()
  @IsString({ each: true })
  ids: string[];

  @IsString()
  phaseId: string;
}
