import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../models/task.model';
import { TaskService } from '../services/task.service';
import { MessageService } from 'primeng/api';

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

  constructor(private route:ActivatedRoute,private messageService:MessageService,private taskService:TaskService,private router:Router){}

  ngOnInit(): void {

    this.route.paramMap.subscribe({
      next:(data)=>{
        this.projectId=parseInt(data.get('projectId')!);
        this.getTasksList();
        //this.filterTasks();
      },error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err}` });
      }
    })

  }

  private getTasksList(){
    this.taskService.getTasksByPorjectId(this.projectId).subscribe({
      next:(data)=>{
        this.taskList=data;
      },error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err}` });
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
