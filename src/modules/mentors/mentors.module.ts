import { Module } from '@nestjs/common';
import { MentorsService } from './mentors.service';
import { MentorsController } from './mentor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorProfile } from './entities/mentor.entity';
import { Experience } from './entities/experience.entity';
import { ExpertisesModule } from './expertises/expertises.module';
import { UsersModule } from '../users/users.module';
import { ExperiencesService } from './experiences.service';

@Module({
  imports: [TypeOrmModule.forFeature([MentorProfile, Experience]), ExpertisesModule, UsersModule],
  controllers: [MentorsController],
  providers: [MentorsService, ExperiencesService]
})
export class MentorsModule {}
