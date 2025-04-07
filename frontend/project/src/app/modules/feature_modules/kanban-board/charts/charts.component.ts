import { EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Task } from '../../../../models/task.model';
import { ChangeDetectorRef, Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gantt } from 'dhtmlx-gantt';


@Component({
  selector: 'app-charts',
  standalone: false,
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnChanges {

  @Input() taskList!: Task[];
  @Output() closeChartsEvent = new EventEmitter<void>();

  //status
  toDoTasks!: Task[];
  inProgressTasks!: Task[];
  doneTasks!: Task[];

  //priority
  lowTasks!: Task[];
  mediumTasks!: Task[];
  highTasks!: Task[];

  items:any;

  barChartData: any;
  barChartOptions: any;
  pieChartByStatusData: any;
  pieChartByStatusOptions: any;
  pieChartByPriorityData: any;
  pieChartByPriorityOptions: any;
  ganntChartdata:any;
  ganntChartOptions:any;

  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterTasks();
    this.barChart();
    this.pieChartByStatus();
    this.pieChartByPriority();
    this.ganttChart();
  }


  filterTasks(): void {
    this.toDoTasks = this.taskList.filter(task => task.status === 'To do');
    this.inProgressTasks = this.taskList.filter(task => task.status === 'In progress');
    this.doneTasks = this.taskList.filter(task => task.status === 'Done');
    this.lowTasks = this.taskList.filter(task => task.priority === 'Low');
    this.mediumTasks = this.taskList.filter(task => task.priority === 'Medium');
    this.highTasks = this.taskList.filter(task => task.priority === 'High');
  }


  barChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.barChartData = {
        labels: ['To do', 'In progress', 'Done'],
        datasets: [
          {
            label: 'Tasks',
            data: [this.toDoTasks.length, this.inProgressTasks.length, this.doneTasks.length],
            backgroundColor: [
              'rgba(246, 5, 5, 0.2)',
              'rgba(11, 41, 240, 0.2)',
              'rgba(16, 233, 59, 0.2)',
            ],
            borderColor: ['rgb(249, 115, 22)', 'rgb(0, 110, 255)', 'rgb(98, 255, 0)'],
            borderWidth: 2,
          },
        ],
      };

      this.barChartOptions = {
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
      this.cd.markForCheck()
    }
  }

  pieChartByStatus() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.pieChartByStatusData = {
        labels: ['To do', 'In progress', 'Done'],
        datasets: [
          {
            data: [this.toDoTasks.length, this.inProgressTasks.length, this.doneTasks.length],
            backgroundColor: [
              'rgba(252, 6, 6, 0.77)',
              'rgba(11, 42, 240, 0.8)',
              'rgba(16, 233, 59, 0.71)',
            ],
          }
        ]
      };

      this.pieChartByStatusOptions = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };
      this.cd.markForCheck()
    }

  }

  pieChartByPriority() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.pieChartByPriorityData = {
        labels: ['Low', 'Medium', 'High'],
        datasets: [
          {
            data: [this.lowTasks.length, this.mediumTasks.length, this.highTasks.length],
            backgroundColor: [
              'rgba(25, 190, 58, 0.47)',
              'rgba(232, 240, 11, 0.88)',
              'rgba(124, 11, 11, 0.6)',
            ],
          }
        ]
      };

      this.pieChartByPriorityOptions = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };
      this.cd.markForCheck()
    }

  }

  ganttChart(){
    gantt.config.readonly = true;
    this.items=this.convertTasksToGanttData(this.taskList);
    gantt.parse({
      data:this.items
    });
    
    gantt.init('gantt_here');
  }

  closeCharts() {
    this.closeChartsEvent.emit();
  }

  convertTasksToGanttData(tasks: Task[]): any[] {
    return tasks.map(task => {
      const startDate = new Date(task.startDate);
      const endDate = new Date(task.dueDate);
      const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
      return {
        id: task.taskId,
        text: task.title,
        start_date: startDate, 
        duration: duration,
        progress: this.getProgress(task.status)
      };
    });
  }
  
  getProgress(status: string): number {
    switch (status) {
      case 'To do':
        return 0;
      case 'In progress':
        return 0.5;
      case 'Done':
        return 1;
      default:
        return 0;
    }
  }
  

}




