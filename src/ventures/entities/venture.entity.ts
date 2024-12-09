import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../shared/utils/abstract.entity';
import { Sector } from './sectors.entity';
import { StageEnum } from '../enum/stage.enum';

@Entity()
export class Venture extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  pitch: string;

  @Column({ type: 'boolean', default: false })
  is_published: boolean;

  @Column({ type: 'datetime' })
  founding_date: Date;

  @Column()
  address: string;

  @Column({ type: 'enum', enum: StageEnum })
  stage: string;

  @Column({ type: 'json', nullable: true })
  socials: JSON;

  @ManyToMany(() => Sector, (sector) => sector.ventures)
  @JoinTable({ name: 'ventures_sectors' })
  sectors: Sector[];
}
