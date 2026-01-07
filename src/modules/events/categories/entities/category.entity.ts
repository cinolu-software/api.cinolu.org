import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '@/core/database/abstract.entity';
import { Event } from '../../entities/event.entity';

@Entity()
export class EventCategory extends AbstractEntity {
  @Column()
  name: string;

  @ManyToMany(() => Event, (event) => event.categories)
  event: Event[];
}
