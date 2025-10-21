import { Column, Entity, ManyToMany } from 'typeorm';
import { Event } from '../../entities/event.entity';
import { AbstractEntity } from 'src/core/database/abstract.entity';

@Entity()
export class EventCategory extends AbstractEntity {
  @Column()
  name: string;

  @ManyToMany(() => Event, (event) => event.categories)
  event: Event[];
}
