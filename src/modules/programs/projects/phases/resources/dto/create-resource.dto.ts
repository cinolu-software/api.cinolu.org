import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ResourceType } from '../entities/resource.entity';

export class CreateResourceDto {
  @IsOptional()
  title?: string;

  @IsEnum(ResourceType)
  type: ResourceType;

  @IsNotEmpty()
  url: string;

  @IsOptional()
  phase?: string;

  @IsOptional()
  project?: string;
}
