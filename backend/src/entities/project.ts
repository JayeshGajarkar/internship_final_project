import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './task';

@Entity('Project_11')
export class Project {
  @PrimaryGeneratedColumn()
  projectId: number;

  @Column()
  projectName: string;

  @Column()
  description: string;

  @Column()
  status:string;

  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', nullable: true })
  dueDate?: Date;

  @OneToMany(() => Task, task => task.project, { cascade: true})
  tasks: Task[];
}