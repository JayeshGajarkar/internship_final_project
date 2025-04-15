import { IsNotEmpty, IsString, IsEnum, Length } from 'class-validator';
import { TaskPriority,TaskStatus } from '../entities/enum.model';

export class TaskDTO {
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsString()
  startDate?: Date;

  @IsString()
  dueDate?: Date;

}
