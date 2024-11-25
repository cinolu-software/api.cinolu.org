import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSubscriber } from './subscribers/user.subscriber';
import { Detail } from './entities/detail.entity';
import { Social } from './entities/social.entity';
import { RolesModule } from '../roles/roles.module';
import { EmailModule } from '../../email/email.module';

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([User, Detail, Social]), EmailModule, RolesModule],
  controllers: [UsersController],
  providers: [UsersService, UserSubscriber],

  exports: [UsersService]
})
export class UsersModule {}
