import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-project-task-display',
  standalone: false,
  templateUrl: './project-task-display.component.html',
  styleUrl: './project-task-display.component.css'
})
export class ProjectTaskDisplayComponent implements OnChanges{


  @Input() taskList!:Task[];

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.taskList);
  }

}
