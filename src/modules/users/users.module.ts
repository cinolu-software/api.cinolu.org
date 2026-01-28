import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { RolesModule } from './roles/roles.module';
import { UserSubscriber } from './subscribers/user.subscriber';
import { AiUsersService } from './ai-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule],
  controllers: [UsersController],
  providers: [UsersService, UserSubscriber, AiUsersService],
  exports: [UsersService]
})
export class UsersModule {}
