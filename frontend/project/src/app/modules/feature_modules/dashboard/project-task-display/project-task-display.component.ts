import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../../models/task.model';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../shared_modules/services/auth.service';
import { User } from '../../../../models/user.model';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-project-task-display',
  standalone: false,
  templateUrl: './project-task-display.component.html',
  styleUrl: './project-task-display.component.css'
})
export class ProjectTaskDisplayComponent implements OnChanges,OnInit {


  @Input() projectId!: number;
  taskList!: Task[];
  editTaskEnable:boolean=false;
  showCommentsEnable:boolean=false;
  addTaskEnable:boolean=false;
  loading:boolean=true;
  task!:Task;
  taskId!:number;
  currUser!:User|null;

  prioroties = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' }
  ];

  statuses = [
    { label: 'In progress', value: 'In progress' },
    { label: 'Done', value: 'Done' },
    { label: 'To do', value: 'To do' }
  ];

  constructor(private taskService: TaskService,private messageService:MessageService,private userService:AuthService) { }

  ngOnInit(): void {
    this.userService.currUserSubject.subscribe({
      next:(data)=>{
        this.currUser=data;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllTask();
  }

  private getAllTask() {
    if (this.projectId) {
      this.taskService.getTasksByPorjectId(this.projectId).subscribe({
        next: (data) => {
          this.taskList = data;
          this.loading = false;
        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err}` });
        }
      })
    }
  }

  getPrioritySeverity(priority: string):Tag['severity'] {
    switch (priority) {
      case 'High':
        return 'danger';
      case 'Medium':
        return 'warn';
      case 'Low':
        return 'success';
      default:
        return 'info';
    }
  }


  getStatusSeverity(status: string):Tag['severity'] {
    switch (status) {
      case 'In progress':
        return 'warn';
      case 'Done':
        return 'success';
      case 'To do':
        return 'info';
      default:
        return 'info';
    }
  }

  editTask(task: Task) {
    this.editTaskEnable=true;
    this.task=task;
  }

  closeEditTask(){
    this.editTaskEnable=false;
    this.getAllTask()
  }

  addTask() {
    this.addTaskEnable = true;
  }

  closeAddTask(){
    this.addTaskEnable=false;
    this.getAllTask();
  }


  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: `${data.message}` });
        this.getAllTask();
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err}` });
      }
    });
  }

  

  showComment(taskId:number){
    this.showCommentsEnable=true;
    this.taskId=taskId;
  }

  closeComment(){
    this.showCommentsEnable=false;
  }

}
