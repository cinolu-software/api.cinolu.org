import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailsDto } from './create-detail.dto';

export class UpdateDetailDto extends PartialType<CreateDetailsDto>(CreateDetailsDto) {}
