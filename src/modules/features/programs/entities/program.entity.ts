import { Attachment } from 'src/modules/utilities/attachments/entities/attachment.entity';
import { Requirement } from 'src/modules/features/requirements/entities/requirement.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { User } from '../../../core/users/entities/user.entity';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { Partner } from '../../partners/entities/partner.entity';
import { Type } from '../../types/entities/type.entity';

@Entity()
export class Program extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  start_at: Date;

  @Column({ type: 'date' })
  end_at: Date;

  @ManyToMany(() => User, (user) => user.programs)
  users: User[];

  @OneToMany(() => Attachment, (attachment) => attachment.program)
  attachments: Attachment[];

  @OneToMany(() => Requirement, (requirement) => requirement.program)
  requirements: Requirement[];

  @ManyToMany(() => Type, (type) => type.programs)
  @JoinTable({ name: 'program_types' })
  types: Type[];

  @ManyToMany(() => Partner, (partner) => partner.programs)
  @JoinTable({ name: 'program_partners' })
  partners: Partner[];
}
