import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  standalone: false,
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent implements OnChanges {

  @Input() Project!:Project;
  @Output() CloseProjectEditEvent=new EventEmitter<void>();

  projectForm = new FormGroup({
    projectName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    startDate: new FormControl(),
    dueDate: new FormControl()
  });

  constructor(private projectService:ProjectService,private router:Router){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Project'] && this.Project) {
      this.projectForm.patchValue({
        projectName: this.Project.projectName,
        description: this.Project.description,
        status: this.Project.status,
        startDate: this.Project.startDate,
        dueDate: this.Project.dueDate
      });
    }
  }

  onSubmit(){
    if(this.Project){
      // console.log("update project called");
      this.projectService.updateProject(this.projectForm.value as Project,this.Project.projectId).subscribe({
        next:(data)=>{
          if(data){
            alert(data);
            this.close(); //navigate dashboard and cole the form
          }
        },error:(err)=>{
          console.log(err);
          alert(err.message);
        }
      });
    }else{
      // console.log("Add project called");
      this.projectService.addProject(this.projectForm.value as Project).subscribe({
        next:(data)=>{
          if(data){
            alert(data.message)
            this.close(); //naviagte dashbord and close the form
          }
        },error:(err)=>{
          console.log(err);
          alert(err.message);
        }
      });
      this.projectForm.reset()
    }
  }

  close(){
    this.CloseProjectEditEvent.emit();
    this.router.navigate(['/dashboard']);
  }
}


