import { PartialType } from '@nestjs/mapped-types';
import AddDetailDto from './add-details.dto';

export class UpdateDetailDto extends PartialType<AddDetailDto>(AddDetailDto) {}
