import { Module } from '@nestjs/common';
import { MentorsService } from './mentors.service';
import { MentorsController } from './mentors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorProfile } from './entities/mentor.entity';
import { Experience } from './entities/experience.entity';
import { ExpertisesModule } from './expertises/expertises.module';
import { UsersModule } from '../users/users.module';
import { ExperiencesService } from './experiences.service';
import { MentorsEmail } from './mentors.email';

@Module({
  imports: [TypeOrmModule.forFeature([MentorProfile, Experience]), ExpertisesModule, UsersModule],
  controllers: [MentorsController],
  providers: [MentorsService, ExperiencesService, MentorsEmail]
})
export class MentorsModule {}
