import { PartialType } from '@nestjs/mapped-types';
import AddDetailDto from './add-detail.dto';

export class UpdateDetailDto extends PartialType<AddDetailDto>(AddDetailDto) {}
