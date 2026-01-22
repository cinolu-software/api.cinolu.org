import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateInterestsDto {
  @IsArray()
  @IsNotEmpty()
  interests: string[];
}
