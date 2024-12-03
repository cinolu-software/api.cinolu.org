import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../shared/utils/base.entity';
import { Event } from './event.entity';

@Entity()
export class EventType extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Event, (event) => event.types)
  events: Event[];
}
