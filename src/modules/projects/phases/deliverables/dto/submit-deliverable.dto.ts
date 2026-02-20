import { IsOptional, IsString, IsUUID } from 'class-validator';

export class SubmitDeliverableDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsUUID()
  participationId: string;
}
