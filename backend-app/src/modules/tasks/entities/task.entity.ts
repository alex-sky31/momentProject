import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('Task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  status: string;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
