import { Column, Entity, ManyToMany } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { BaseEntity } from '../../shared/utils/base.entity';

@Entity()
export class EventType extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Event, (event) => event.types)
  events: Event[];
}
