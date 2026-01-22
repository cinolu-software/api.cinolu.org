import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOpportunityTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
