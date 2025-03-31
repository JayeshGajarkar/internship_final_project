import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Comment } from '../../../../models/comment.model';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../../shared_modules/services/auth.service';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-comment',
  standalone: false,
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnChanges,OnInit {

  @Input() taskId!: number;
  comments: Comment[] = [];
  commentText:string='';
  currentUser!:User|null;

  constructor(private commentService: CommentService,private userService:AuthService) { }

  ngOnInit(){
    this.userService.currUserSubject.subscribe({
      next: (data) => {
        this.currentUser=data;
        console.log(data);
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  private getAllComment(){
    this.commentService.getCommentsByTaskId(this.taskId).subscribe({
      next: (data) => {
        this.comments = data;
      }, error: (err) => {
        console.log(err);
        alert(err.message);
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllComment();
  }

  onSubmit(form: any) {
    if(this.currentUser){
      this.commentService.addComment(form.value,this.taskId,this.currentUser.userId).subscribe({
        next: (data) => {
          console.log(data);
          this.commentText='';
          this.getAllComment();
        }, error: (err) => {
          console.log(err);
          alert(err.message);
        }
      })
    }
  }
}
