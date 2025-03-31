import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../../models/task.model';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-project-task-display',
  standalone: false,
  templateUrl: './project-task-display.component.html',
  styleUrl: './project-task-display.component.css'
})
export class ProjectTaskDisplayComponent implements OnChanges {


  @Input() projectId!: number;
  taskList!: Task[];
  editTaskEnable:boolean=false;
  showCommentsEnable:boolean=false;
  task!:Task;
  taskId!:number;

  constructor(private taskService: TaskService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllTask();
  }

  private getAllTask() {
    if (this.projectId) {
      this.taskService.getTasksByPorjectId(this.projectId).subscribe({
        next: (data) => {
          this.taskList = data;
        }, error: (err) => {
          console.log(err);
          alert(err.message);
        }
      })
    }
  }

  editTask(task: Task) {
    this.editTaskEnable=true;
    this.task=task;
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: (data) => {
        alert(data.message)
        this.getAllTask();
      }, error: (err) => {
        console.log(err);
        alert(err.message);
      }
    });
  }

  closeEditTask(){
    this.editTaskEnable=false;
    this.getAllTask()
  }

  showComment(taskId:number){
    this.showCommentsEnable=true;
    this.taskId=taskId;
  }

  closeComment(){
    this.showCommentsEnable=false;
  }

}
