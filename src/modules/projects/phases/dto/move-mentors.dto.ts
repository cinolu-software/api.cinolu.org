import { IsArray, IsUUID } from 'class-validator';

export class MoveMentorsDto {
  @IsArray()
  @IsUUID('4', { each: true })
  ids: string[];
}
