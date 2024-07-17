import { Module } from '@nestjs/common';
import { RequirementsService } from './requirements.service';
import { RequirementsController } from './requirements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Requirement } from './entities/requirement.entity';

@Module({
  controllers: [RequirementsController],
  providers: [RequirementsService],
  imports: [TypeOrmModule.forFeature([Requirement])],
  exports: [RequirementsService]
})
export class RequirementsModule {}
