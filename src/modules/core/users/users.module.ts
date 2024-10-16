import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSubscriber } from './subscribers/user.subscriber';
import { EmailModule } from 'src/modules/core/email/email.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([User]), EmailModule, RolesModule],
  controllers: [UsersController],
  providers: [UsersService, UserSubscriber],

  exports: [UsersService]
})
export class UsersModule {}