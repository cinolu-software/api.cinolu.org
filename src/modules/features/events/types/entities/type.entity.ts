import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Event } from '../../events/entities/event.entity';

@Entity()
export class EventType extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Event, (event) => event.types)
  events: Event[];
}
