import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../../../shared/utils/abstract.entity';
import { Event } from '../../entities/event.entity';

@Entity('eventsCategory')
export class Category extends AbstractEntity {
  @Column()
  name: string;

  @ManyToMany(() => Event, (event) => event.categories)
  event: Event[];
}
