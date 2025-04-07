import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Task } from './task';
import { User } from './user';
import { ProjectStatus } from './enum.model';

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

@Entity('Project_14')
export class Project {
  @PrimaryGeneratedColumn()
  projectId: number;

  @Column({ type: 'varchar', length: 30 })
  projectName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'varchar',
    default: ProjectStatus.NOT_STARTED,
  })
  status: ProjectStatus;

  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', nullable: true })
  dueDate?: Date;

  @ManyToOne(() => User, user => user.projects)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Task, task => task.project, { cascade: true })
  tasks: Task[];
}
