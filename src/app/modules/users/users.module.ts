import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSubscriber } from './subscribers/user.subscriber';
import { EmailModule } from 'src/app/modules/email/email.module';
import { Role } from '../roles/entities/role.entity';
import { UsersSeeder } from './users.seeder';

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([User, Role]), EmailModule],
  controllers: [UsersController],
  providers: [UsersService, UserSubscriber, UsersSeeder],
  exports: [UsersService]
})
export class UsersModule {}
