import { Controller, Get } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { Public } from '../../core/auth/decorators/public.decorator';
import { HighlightedItems } from './types';

@Controller('highlights')
export class HighlightsController {
  constructor(private highlightsService: HighlightsService) {}

  @Get()
  @Public()
  async findAll(): Promise<HighlightedItems> {
    return await this.highlightsService.findAll();
  }
}
