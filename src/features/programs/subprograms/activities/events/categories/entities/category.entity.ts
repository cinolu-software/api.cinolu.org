import { Column, Entity, ManyToMany } from 'typeorm';
import { Event } from '../../entities/event.entity';
import { BaseEntity } from 'src/shared/utils/abstract.entity';

@Entity()
export class EventCategory extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Event, (event) => event.categories)
  event: Event[];
}
