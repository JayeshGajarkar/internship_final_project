import { Component, EventEmitter, Input, OnChanges, OnInit, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Comment } from '../../../../models/comment.model';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../../shared_modules/services/auth.service';
import { User } from '../../../../models/user.model';
import { MessageService } from 'primeng/api';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-comment',
  standalone: false,
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnChanges, OnInit, OnDestroy {

  @Input() taskId!: number;
  @Output() closeCommentsEvent = new EventEmitter<void>();
  comments: Comment[] = [];
  commentText: string = '';
  currUser!: User | null;
  selectedFile: File | null = null;
  fileUploadEnable: boolean = false;

  constructor(
    private commentService: CommentService, 
    private userService: AuthService, 
    private messageService: MessageService,
    private websocketService: WebsocketService
  ) { }

  ngOnInit() {
    this.userService.currUserSubject$.subscribe({
      next: (data) => {
        this.currUser = data;
        if (this.currUser) {
          this.websocketService.connect(String(this.currUser.userId)); // Save connection with user ID
        }
      }, 
      error: (err) => {
        console.log(err);
      }
    });

    this.getAllComment();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Subscribe to the WebSocket connection
    this.websocketService.getMessages().subscribe((message) => {
      if(message.taskId===this.taskId){
        console.log(message);
        this.comments.push(message.text);
      }
    });

    // this.getAllComment();
  }

  ngOnDestroy() {
    if (this.currUser) {
      this.websocketService.closeConnection(String(this.currUser.userId)); // Close connection on destroy
    }
  }

  private getAllComment() {
    this.commentService.getCommentsByTaskId(this.taskId).subscribe({
      next: (data) => {
        this.comments = data;
      }, 
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err}` });
      }
    });
  }

  onSubmit(form: any) {
    if (this.currUser) {
      if (!this.fileUploadEnable && this.commentText) {
        this.commentService.addComment(form.value, this.taskId, this.currUser.userId).subscribe({
          next: (data) => {
            this.commentText = '';
            this.sendMessage(data.comment);
          }, 
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err}` });
          }
        });
      } else if (this.selectedFile) {
        const fileData = new FormData();
        fileData.append('file', this.selectedFile, this.selectedFile.name);
        this.commentService.sendFile(this.taskId, this.currUser.userId, fileData).subscribe({
          next: (data) => {
            this.fileUploadEnable = false;
            this.selectedFile = null;
            this.sendMessage(data.comment);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: `${data.message}` });
          }, 
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err}` });
          }
        });
      }
    }
  }

  private sendMessage(message: string) {
    if (message) {
      this.websocketService.sendMessage({ text: message, userId: this.currUser?.userId, taskId: this.taskId });
    }
  }

  closeComment() {
    this.closeCommentsEvent.emit();
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: `${data.message}` });
        const index = this.comments.findIndex(c => c.commentId === commentId);
        this.comments.splice(index, 1);
      }, 
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err}` });
      }
    });
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
    return text.startsWith('file-');
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
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error}` });
      }
    });
  }
}
