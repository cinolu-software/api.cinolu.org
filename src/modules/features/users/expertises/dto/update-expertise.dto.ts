import { PartialType } from '@nestjs/mapped-types';
import { CreateExpertiseDto } from './create-expertise.dto';

export class UpdateExpertiseDto extends PartialType(CreateExpertiseDto) {}
