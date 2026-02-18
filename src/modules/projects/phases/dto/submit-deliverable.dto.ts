import { IsUUID, IsUrl } from 'class-validator';

export class SubmitDeliverableDto {
  @IsUrl()
  content: string;

  @IsUUID()
  participationId: string;
}
