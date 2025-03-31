import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from './comment';
import { Task } from './task';
import { Project } from './project';

@Entity('User_13')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 10 })
  role: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Task, task => task.user)
  tasks: Task[];

  @OneToMany(() => Project, project => project.user)
  projects: Project[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
}