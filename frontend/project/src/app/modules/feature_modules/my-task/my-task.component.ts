import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared_modules/services/auth.service';
import { User } from '../../../models/user.model';
import { Task } from '../../../models/task.model';
import { TaskService } from '../services/task.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-my-task',
  standalone: false,
  templateUrl: './my-task.component.html',
  styleUrl: './my-task.component.css'
})
export class MyTaskComponent implements OnInit {

  currUser!: User | null;
  taskList!: Task[];
  editTaskEnable: boolean = false;
  showCommentsEnable: boolean = false;
  taskId!: number;
  previousEditedTask!: Task;


  constructor(private userService: AuthService, private taskService: TaskService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.userService.currUserSubject$.subscribe(data => {
      this.currUser = data;
    })

    if (this.currUser) {
      this.taskService.getTasksByUserId(this.currUser?.userId).subscribe({
        next: (data) => {
          this.taskList = data;
        },error:(err)=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err}` });
        }
      })
    }
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'To do':
        return 'to-do';
      case 'In progress':
        return 'in-progress';
      case 'Done':
        return 'done';
      default:
        return 'done';
    }
  }

  editTask(task: Task) {
    if (this.previousEditedTask) {
      this.previousEditedTask.isEditable = false;
    }
    task.isEditable = true;
    this.previousEditedTask = task;
  }

  updateTaskStatus(task: Task, taskId: number) {

    if (this.currUser) {
      task.userId = this.currUser?.userId;
    }

    this.editTaskEnable = false;

    this.taskService.updateTask(taskId, task).subscribe({
      next: (data) => {
        console.log(data);
        this.messageService.add({ severity: 'info', summary: 'Info', detail: `${data.message}` });
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err}` });
      }
    })
  }

  showComment(taskId: number) {
    this.showCommentsEnable = true
    this.taskId = taskId;
  }

  closeComment() {
    this.showCommentsEnable = false;
  }

}
