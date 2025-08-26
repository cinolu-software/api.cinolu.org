import { Controller, Get } from '@nestjs/common';
import { HighlightedItems, HighlightService } from './highlight.service';
import { Public } from '../../shared/decorators/public.decorator';

@Controller('highlight')
export class HighlightController {
  constructor(private service: HighlightService) {}

  @Get()
  @Public()
  async findAll(): Promise<HighlightedItems> {
    return await this.service.findAll();
  }
}
