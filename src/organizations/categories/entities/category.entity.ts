import { Organization } from 'src/organizations/entities/organization.entity';
import { AbstractEntity } from 'src/shared/utils/abstract.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('membersCategory')
export class Category extends AbstractEntity {
  @Column()
  name: string;

  @ManyToMany(() => Organization, (organization) => organization.categories)
  organizations: Organization[];
}
