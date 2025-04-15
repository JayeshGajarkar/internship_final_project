import { IsNotEmpty, IsString, IsOptional, IsEnum, IsDate, Length } from 'class-validator';
import { ProjectStatus } from '../entities/enum.model';

export class ProjectDTO {
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  projectName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  @IsString()
  startDate?: Date;

  @IsString()
  dueDate?: Date;

}
