import { IsString, IsUUID } from 'class-validator';

export class SubmitDeliverableDto {
  @IsString()
  content: string;

  @IsUUID()
  participationId: string;
}
