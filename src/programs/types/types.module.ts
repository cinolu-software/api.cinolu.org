import { Module } from '@nestjs/common';
import { TypesService } from '../services/types.service';
import { TypesController } from '../controllers/types.controller';

@Module({
  controllers: [TypesController],
  providers: [TypesService]
})
export class ProgramTypesModule {}
