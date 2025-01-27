import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailModule } from '../email/email.module';
import { UsersService } from './users.service';
import { ExpertisesModule } from './expertises/expertises.module';
import { PositionsModule } from './positions/positions.module';
import { RolesModule } from './roles/roles.module';
import { DetailsModule } from './details/details.module';
import { UserSubscriber } from './subscribers/user.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    EmailModule,
    ExpertisesModule,
    PositionsModule,
    RolesModule,
    DetailsModule
  ],
  controllers: [UsersController],
  providers: [UsersService, UserSubscriber],
  exports: [UsersService]
})
export class UsersModule {}
