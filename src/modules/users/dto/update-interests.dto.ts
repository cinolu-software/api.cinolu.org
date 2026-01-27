import { IsArray } from 'class-validator';

export class UpdateInterestsDto {
  @IsArray()
  interests: string[];
}
