import { Module } from '@nestjs/common';
import { Organization } from './entities/organization.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Organization]), CategoriesModule],
  controllers: [OrganizationsController],
  providers: [OrganizationsService]
})
export class OrganizationsModule {}
