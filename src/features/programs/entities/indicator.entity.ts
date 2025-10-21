import { AbstractEntity } from 'src/core/database/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Program } from './program.entity';
import { Metric } from '../subprograms/metrics/entities/metric.entity';

@Entity()
export class Indicator extends AbstractEntity {
  @Column()
  name: string;

  @ManyToOne(() => Program, (program) => program.indicators)
  @JoinColumn()
  program: Program;

  @OneToMany(() => Metric, (metric) => metric.indicator)
  metrics: Metric[];
}
