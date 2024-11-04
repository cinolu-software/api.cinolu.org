import { Attachment } from 'src/modules/utilities/attachments/entities/attachment.entity';
import { Requirement } from 'src/modules/features/programs/requirements/entities/requirement.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { User } from '../../../../core/users/entities/user.entity';
import { BaseEntity } from '../../../../../common/entities/base.entity';
import { Partner } from '../../partners/entities/partner.entity';
import { Type } from '../../types/entities/type.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Program extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  started_at: Date;

  @Column({ type: 'date' })
  ended_at: Date;

  @ManyToMany(() => User, (user) => user.programs)
  users: User[];

  @OneToMany(() => Attachment, (attachment) => attachment.program)
  attachments: Attachment[];

  @OneToMany(() => Requirement, (requirement) => requirement.program)
  requirements: Requirement[];

  @ManyToMany(() => Type, (type) => type.programs)
  @JoinTable({ name: 'program_types' })
  types: Type[];

  @ManyToMany(() => Category, (category) => category.programs)
  @JoinTable({ name: 'program_categories' })
  categories: Category[];

  @ManyToMany(() => Partner, (partner) => partner.programs)
  @JoinTable({ name: 'program_partners' })
  partners: Partner[];
}
