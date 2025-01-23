import { Column, Entity, ManyToMany } from 'typeorm';
import { Event } from '../../entities/event.entity';
import { AbstractEntity } from '../../../../shared/utils/abstract.entity';

@Entity()
export class EventType extends AbstractEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Event, (event) => event.types)
  events: Event[];
}
