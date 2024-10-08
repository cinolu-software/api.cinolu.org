import { Notification } from 'src/modules/notification/entities/notification.entity';
import { Program } from 'src/modules/programs/entities/program.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity()
export class Attachment extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Program, (program) => program.attachments)
  program: Program;

  @ManyToOne(() => Notification, (notification) => notification.attachments, { nullable: true })
  notification: Notification;
}
