import { Module } from '@nestjs/common';
import { MentorsService } from './mentors.service';
import { MentorsController } from './mentors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mentor } from './entities/mentor.entity';
import { Experience } from './entities/experience.entity';
import { ExpertisesModule } from './expertises/expertises.module';

@Module({
  imports: [TypeOrmModule.forFeature([Mentor, Experience]), ExpertisesModule],
  controllers: [MentorsController],
  providers: [MentorsService]
})
export class MentorsModule {}
