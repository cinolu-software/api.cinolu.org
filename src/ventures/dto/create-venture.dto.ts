import { IsNotEmpty, IsOptional } from 'class-validator';
import { StageEnum } from '../enum/stage.enum';

export class CreateVentureDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  pitch: string;

  @IsNotEmpty()
  founding_date: Date;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  stage: StageEnum;

  @IsOptional()
  socials: JSON;

  @IsOptional()
  sectors: string[];
}
