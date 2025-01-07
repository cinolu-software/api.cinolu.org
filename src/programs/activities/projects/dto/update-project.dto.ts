import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramDto } from './create-project.dto';

export class UpdateProgramDto extends PartialType(CreateProgramDto) {}
