import { PartialType } from '@nestjs/mapped-types';
import { CreatePhaseFormDto } from './create-form.dto';

export class UpdateFormDto extends PartialType(CreatePhaseFormDto) {}
