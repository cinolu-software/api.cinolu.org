import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [CategoriesModule, MembersModule]
})
export class EcosystemModule {}
