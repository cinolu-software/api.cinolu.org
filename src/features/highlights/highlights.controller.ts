import { Controller, Get } from '@nestjs/common';
import { HighlightedItems, HighlightsService } from './highlights.service';
import { Public } from '../../shared/decorators/public.decorator';

@Controller('highlights')
export class HighlightsController {
  constructor(private highlightsService: HighlightsService) {}

  @Get()
  @Public()
  async findAll(): Promise<HighlightedItems> {
    return await this.highlightsService.findAll();
  }
}
