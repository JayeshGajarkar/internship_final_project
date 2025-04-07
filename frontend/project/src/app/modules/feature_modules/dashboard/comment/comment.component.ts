import { Component, EventEmitter, input, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Comment } from '../../../../models/comment.model';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../../shared_modules/services/auth.service';
import { User } from '../../../../models/user.model';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-comment',
  standalone: false,
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnChanges, OnInit {

  @Input() taskId!: number;
  @Output() closeCommentsEvent = new EventEmitter<void>()
  comments: Comment[] = [];
  commentText: string = '';
  currUser!: User | null;
  selectedFile: File | null = null;
  fileUploadEnable: boolean = false;

  constructor(private commentService: CommentService, private userService: AuthService, private messageService: MessageService) { }

  ngOnInit() {

    this.userService.currUserSubject.subscribe({
      next: (data) => {
        this.currUser = data;
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  private getAllComment() {
    this.commentService.getCommentsByTaskId(this.taskId).subscribe({
      next: (data) => {
        this.comments = data;
        console.log(data);
        console.log(data[0].commentTime);
      }, error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.message}` });
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllComment();
  }

  onSubmit(form: any) {
    if (this.currUser) {
      if (!this.fileUploadEnable && this.commentText) {
        this.commentService.addComment(form.value, this.taskId, this.currUser.userId).subscribe({
          next: (data) => {
            this.commentText = '';
            this.getAllComment();
          }, error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.message}` });
          }
        })
      } else {
        if (this.selectedFile) {
          const fileData = new FormData();
          fileData.append('file', this.selectedFile, this.selectedFile.name);
          this.commentService.sendFile(this.taskId, this.currUser.userId, fileData).subscribe({
            next: (data) => {
              console.log(data);
              this.fileUploadEnable = false;
              this.selectedFile = null;
              this.getAllComment();
              this.messageService.add({ severity: 'success', summary: 'Success', detail: `${data.message}` });
            }, error: (err) => {
              console.log(err);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.message}` });
            }
          })

        }
      }
    }
  }

  closeComment() {
    this.closeCommentsEvent.emit();
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: `${data.message}` });
        this.getAllComment();
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.message}` });
      }
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }


  addFileEnable() {
    this.fileUploadEnable = true;
  }

  addFileClose() {
    this.fileUploadEnable = false;
  }

  isFileComment(text: string): boolean {
    if (text.startsWith('file-')) {
      return true;
    } else {
      return false;
    }
  }

  downloadFile(fileName: string) {
    this.commentService.downloadFile(fileName).subscribe({
      next: (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error: (error) => console.error('Download failed', error)
    });    
  }
}