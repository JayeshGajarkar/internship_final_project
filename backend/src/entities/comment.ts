import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Timestamp } from 'typeorm';
import { Task } from './task';
import { User } from './user';

@Entity('Comment_14')
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column()
  commentText: string;

  @Column({ type:'timestamp' })
  commentTime: Timestamp;

  @ManyToOne(() => Task, task => task.comments, { onDelete: 'CASCADE' })
  @JoinColumn({name:'taskId'})
  task: Task;

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({name:'userId'})
  user: User;
}