import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../shared/utils/base.entity';
import { CallApplication } from './application.entity';

@Entity()
export class Call extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'json' })
  form: JSON;

  @OneToMany(() => CallApplication, (app) => app.call)
  applications: CallApplication[];
}
