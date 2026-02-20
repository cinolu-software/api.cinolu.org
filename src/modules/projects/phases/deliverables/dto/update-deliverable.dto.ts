import { PartialType } from '@nestjs/swagger';
import { CreateDeliverableDto } from './create-deliverable.dto';

export class UpdateDeliverableDto extends PartialType(CreateDeliverableDto) {}
