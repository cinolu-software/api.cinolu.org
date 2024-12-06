import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSubscriber } from './subscribers/user.subscriber';
import { Detail } from './entities/detail.entity';
import { EmailModule } from '../email/email.module';
import { UsersService } from './services/users.service';
import { ExpertisesController } from './controllers/expertises.controller';
import { PositionsController } from './controllers/positions.controller';
import { RolesController } from './controllers/roles.controller';
import { ExpertisesService } from './services/expertises.service';
import { PositionsService } from './services/positions.service';
import { RolesService } from './services/roles.service';
import { Expertise } from './entities/expertise.entity';
import { Position } from './entities/position.entity';
import { Role } from './entities/role.entity';
import { DetailsService } from './services/details.service';

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([User, Expertise, Position, Role, Detail])],
  controllers: [UsersController, ExpertisesController, PositionsController, RolesController],
  providers: [UsersService, DetailsService, ExpertisesService, PositionsService, RolesService, UserSubscriber],
  exports: [UsersService]
})
export class UsersModule {}
