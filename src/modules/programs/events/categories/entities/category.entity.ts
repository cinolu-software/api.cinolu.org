import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../../../shared/utils/abstract.entity';
import { Event } from '../../entities/event.entity';

@Entity()
export class EventCategory extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Event, (event) => event.categories)
  event: Event[];
}
