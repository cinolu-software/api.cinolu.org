import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
  imports: [CategoriesModule, OrganizationsModule]
})
export class EcosystemModule {}
