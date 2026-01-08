import { Module } from '@nestjs/common';
import { MentorsProfilesService } from './mentors-profiles.service';
import { MentorsProfileController } from './mentors-profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorProfile } from './entities/mentor-profile.entity';
import { Experience } from './entities/experience.entity';
import { ExpertisesModule } from './expertises/expertises.module';
import { UsersModule } from '../users/users.module';
import { ExperiencesService } from './experiences.service';

@Module({
  imports: [TypeOrmModule.forFeature([MentorProfile, Experience]), ExpertisesModule, UsersModule],
  controllers: [MentorsProfileController],
  providers: [MentorsProfilesService, ExperiencesService]
})
export class MentorsProfileModule {}
