import { Module } from '@nestjs/common';
import { HighlightsController } from './highlights.controller';
import { HighlightsService } from './highlights.service';

@Module({
  controllers: [HighlightsController],
  providers: [HighlightsService]
})
export class HighlightsModule {}
