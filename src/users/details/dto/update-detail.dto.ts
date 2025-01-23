import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailDto } from './create-detail.dto';

export class UpdateDetailDto extends PartialType<CreateDetailDto>(CreateDetailDto) {}
