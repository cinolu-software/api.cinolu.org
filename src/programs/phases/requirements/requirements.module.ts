import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequirementsController } from './requirements.controller';
import { RequirementsService } from './requirements.service';
import { Requirement } from './entities/requirement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Requirement])],
  controllers: [RequirementsController],
  providers: [RequirementsService]
})
export class RequirementsModule {}
