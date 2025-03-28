import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-project-task-form',
  standalone: false,
  templateUrl: './project-task-form.component.html',
  styleUrl: './project-task-form.component.css'
})
export class ProjectTaskFormComponent {

  @Input() task!:Task[];

  projectTaskForm = new FormGroup({
    projectTaskId: new FormControl(),
    projectId: new FormControl(0,Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('To do', Validators.required),
    assignedUser: new FormControl(''),
    startDate: new FormControl(null),
    dueDate: new FormControl(null)
  });

  constructor(private taskService:TaskService){}

  onSubmit(){
    
  }


}
