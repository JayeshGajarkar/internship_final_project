import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared_modules/services/auth.service';
import { Task } from '../../../../models/task.model';
import { User } from '../../../../models/user.model';
import { MessageService } from 'primeng/api';
;

@Component({
  selector: 'app-project-task-form',
  standalone: false,
  templateUrl: './project-task-form.component.html',
  styleUrl: './project-task-form.component.css'
})

export class ProjectTaskFormComponent implements OnChanges {

  @Input() task!: Task;
  @Input() projectId!: number;
  @Output() closeTaskFormEvent = new EventEmitter<void>();
  userList!: User[];

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    priority:new FormControl('',Validators.required),
    status: new FormControl('To do', Validators.required),
    userId: new FormControl(0, Validators.required),
    startDate: new FormControl(),
    dueDate: new FormControl()
  });

  constructor(private taskService: TaskService, private router: Router, private userService: AuthService,private messageService:MessageService) {
    this.userService.getUserByRole("Employee").subscribe({
      next: (data) => {
        this.userList = data;
        // console.log(this.userList);
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes['task'] && this.task) {
      this.taskForm.patchValue({
        title:this.task.title,
        description:this.task.description,
        priority:this.task.priority,
        status:this.task.status,
        userId: this.task.userId,
        startDate: this.task.startDate,
        dueDate: this.task.dueDate
      });
    }
  }

  onSubmit() {
    if(!this.task){
      // console.log(this.taskForm.value);
      // console.log(this.projectId);
      this.taskService.addTask(this.taskForm.value as Task, this.projectId).subscribe({
        next: (data) => {
          if (data) {
            this.messageService.add({ severity: 'info', summary: 'Info', detail: `${data.message}` })
            this.close();
          }
        }, error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.message}` });
        }
      })
    }else{
      this.taskService.updateTask(this.task.taskId,this.taskForm.value as Task).subscribe({
        next: (data) => {
          if (data) {
            this.messageService.add({ severity: 'info', summary: 'Info', detail: `${data.message}` })
            this.close();
          }
        }, error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.message}` });
        }
      });
    }

  }

  close() {
    this.closeTaskFormEvent.emit();
  }

}
