import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-kanban-board',
  standalone: false,
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent implements OnInit {

  projectId!:number;
  taskList!:Task[];
  viewChartEnable:boolean=false;

  constructor(private route:ActivatedRoute,private taskService:TaskService,private router:Router){}

  ngOnInit(): void {

    this.route.paramMap.subscribe({
      next:(data)=>{
        this.projectId=parseInt(data.get('projectId')!);
        this.getTasksList();
        //this.filterTasks();
      },error:(err)=>{
        console.log(err);
      }
    })

  }

  private getTasksList(){
    this.taskService.getTasksByPorjectId(this.projectId).subscribe({
      next:(data)=>{
        this.taskList=data;
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  close(){
    this.router.navigate(['/dashboard']);
  }


  viewChart(){
    this.viewChartEnable=true;
  }

  closeCharts(){
    this.viewChartEnable=false;
  }

}
