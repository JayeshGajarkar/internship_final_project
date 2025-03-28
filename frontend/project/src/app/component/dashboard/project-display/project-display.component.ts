import { Component } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-display',
  standalone: false,
  templateUrl: './project-display.component.html',
  styleUrl: './project-display.component.css'
})

export class ProjectDisplayComponent {

  projectList!: Project[];
  editModeEnable: boolean = false;
  addTaskEnable:boolean=false;
  project!: Project;

  constructor(private projectService: ProjectService) {
    this.getAllproject();
  }

  //subscribe again when edit form close
  private getAllproject() {
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        if (data) {
          this.projectList = data;
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  editProject(project: Project) {
    this.editModeEnable = true;
    this.project = project;
  }

  closeEditForm(){
    this.editModeEnable = false;
    this.getAllproject();
  }

  deleteProject(projectId: number){
    this.projectService.deleteProject(projectId).subscribe({
      next:(data) => {
        console.log(data);
        if (data) {
          alert(data);
          this.getAllproject();
        }
      }, error: (err) => {
          alert(err);
      }
    })
  }

  addTask(){
    this.editModeEnable=true;
  }
}
