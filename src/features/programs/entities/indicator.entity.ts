import { AbstractEntity } from 'src/core/database/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Program } from './program.entity';
import { Metric } from '../subprograms/metrics/entities/metric.entity';

@Entity()
export class Indicator extends AbstractEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  target: number;

  @Column({ nullable: true })
  year: number;

  @ManyToOne(() => Program, (program) => program.indicators)
  @JoinColumn()
  program: Program;

  @OneToMany(() => Metric, (metric) => metric.indicator)
  metrics: Metric[];
}
