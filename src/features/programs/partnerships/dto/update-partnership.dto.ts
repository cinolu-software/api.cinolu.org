import { PartialType } from '@nestjs/mapped-types';
import { CreatePartnershipDto } from './create-partnership.dto';

export class UpdatePartnershipDto extends PartialType(CreatePartnershipDto) {}
