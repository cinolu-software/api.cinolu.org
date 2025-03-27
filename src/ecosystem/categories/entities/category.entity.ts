import { AbstractEntity } from 'src/shared/utils/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('membersCategory')
export class Category extends AbstractEntity {
  @Column()
  name: string;
}
