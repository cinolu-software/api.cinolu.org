import { Module } from '@nestjs/common';
import { RequirementsService } from './requirements.service';
import { RequirementsController } from './requirements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Requirement } from './entities/requirement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Requirement])],
  controllers: [RequirementsController],
  providers: [RequirementsService]
})
export class RequirementsModule {}
