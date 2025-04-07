import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Project } from './project';
import { Comment } from './comment';
import { User } from './user';
import { TaskPriority, TaskStatus } from './enum.model';

@Entity('Task_14')
export class Task {
  @PrimaryGeneratedColumn()
  taskId: number;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'varchar',
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  @Column({
    type: 'varchar',
    default: TaskStatus.TO_DO,
  })
  status: TaskStatus;

  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', nullable: true })
  dueDate?: Date;

  @ManyToOne(() => Project, project => project.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @ManyToOne(() => User, user => user.tasks)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Comment, comment => comment.task, { cascade: true })
  comments: Comment[];
}
