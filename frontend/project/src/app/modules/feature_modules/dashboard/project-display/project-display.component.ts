import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../../../models/project.model';
import { User } from '../../../../models/user.model';
import { AuthService } from '../../../shared_modules/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-project-display',
  standalone: false,
  templateUrl: './project-display.component.html',
  styleUrls: ['./project-display.component.css']
})
export class ProjectDisplayComponent implements OnInit {
  projectList: Project[]=[];
  addProjectEnable: boolean = false;
  editModeEnable: boolean = false;
  addTaskEnable: boolean = false;
  showTaskEnable: boolean = false;
  project!: Project;
  projectId!: number;
  currUser!: User | null;

  statuses = [
    { label: 'Not Started', value: 'Not Started' },
    { label: 'Active', value: 'Active' },
    { label: 'Completed', value: 'Completed' }
  ];

  loading: boolean = true;

  constructor(
    private projectService: ProjectService,
    private userService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.userService.currUserSubject.subscribe({
      next: (data) => {
        this.currUser = data;
        this.getAllProjects();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  private getAllProjects() {
    if (this.currUser?.role === 'Admin') {
      this.projectService.getAllProjects().subscribe({
        next: (data) => {
          if (data) {
            this.projectList = data;
            this.convertStringToDate();
            this.loading = false;
          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err}` });
        }
      });
    } else if (this.currUser?.role === 'Manager') {
      this.projectService.getAllProjectByManager(this.currUser.userId).subscribe({
        next: (data) => {
          if (data) {
            this.projectList = data;
            this.convertStringToDate();
            this.loading = false;
          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err}` });
        }
      });
    } else if (this.currUser?.role === 'Employee') {
      console.log("Employee")
      this.projectService.getAllProjectByEmployee(this.currUser.userId).subscribe({
        next: (data) => {
          if (data) {
            this.projectList = data;
            this.convertStringToDate();
            this.loading = false;
          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err}` });
        }
      });
    }
  }

  private convertStringToDate(){
    // Ensure dates are converted to Date objects
    this.projectList.forEach(project => {
        project.startDate = new Date(project.startDate);
        project.dueDate = new Date(project.dueDate);
    });
  }

  addProject() {
    this.addProjectEnable = true;
  }

  closeAddProjectForm() {
    this.addProjectEnable = false;
    this.getAllProjects();
  }

  editProject(project: Project) {
    this.editModeEnable = true;
    this.project = project;
  }

  closeEditForm() {
    this.editModeEnable = false;
    this.getAllProjects();
  }

  deleteProject(projectId: number) {
    this.projectService.deleteProject(projectId).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `${data.message}` });
        this.getAllProjects();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
      }
    });
  }

  closeAddTask() {
    this.addTaskEnable = false;
  }

  showTasks(projectId: number) {
    this.showTaskEnable = true;
    this.projectId = projectId;
  }

  closeShowTask() {
    this.showTaskEnable = false;
  }

  viewKanbanBoard(projectId: number) {
    this.router.navigate(['/dashboard/kanbanBoard', projectId]);
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: string): Tag['severity'] { //Assign color by status
    switch (status) {
      case 'Not Started':
        return 'info';
      case 'Active':
        return 'success';
      case 'Completed':
        return 'warn';
      default:
        return 'info';
    }
  }
}