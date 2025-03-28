import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Project } from './project';
import { Comment } from './comments';
import { User } from './user';

@Entity('Task_11')
export class Task {
  @PrimaryGeneratedColumn()
  taskId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', nullable: true })
  dueDate?: Date;

  @ManyToOne(() => Project, project => project.tasks,{onDelete:'CASCADE'})
  @JoinColumn({name:'projectId'})
  project: Project;

  @ManyToOne(()=>User,user=>user.tasks,{onDelete:'CASCADE'})
  @JoinColumn({name:'userId'})
  user:User

  @OneToMany(() => Comment, comment => comment.task, { cascade: true})
  comments: Comment[];
}