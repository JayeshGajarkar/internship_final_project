import { IsNotEmpty, IsString, IsDate, IsInt } from 'class-validator';

export class CommentDTO {
  @IsNotEmpty()
  @IsString()
  commentText: string;
}
