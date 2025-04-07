import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { Project } from '../../../../models/project.model';
import { User } from '../../../../models/user.model';
import { AuthService } from '../../../shared_modules/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-project-form',
  standalone: false,
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent implements OnChanges,OnInit {

  @Input() Project!:Project;
  @Output() CloseProjectEditEvent=new EventEmitter<void>();
  userList:User[]=[];

  projectForm = new FormGroup({
    projectName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    startDate: new FormControl(),
    dueDate: new FormControl(),
    userId:new FormControl(0,Validators.required),
  });

  constructor(private projectService:ProjectService,private router:Router,private authService:AuthService,private messageService:MessageService){}

  ngOnInit(){
    this.authService.getUserByRole("Manager").subscribe({
      next:(data)=>{
        if(data){
          this.userList=data;
        }
      },error:(err)=>{
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.message}` });
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Project'] && this.Project) {
      this.projectForm.patchValue({
        projectName: this.Project.projectName,
        description: this.Project.description,
        status: this.Project.status,
        startDate: this.Project.startDate,
        dueDate: this.Project.dueDate,
        userId:this.Project.userId,
      });
    }
  }

  onSubmit(){
    if(this.Project){
      // console.log("update project called");
      this.projectService.updateProject(this.projectForm.value as Project,this.Project.projectId).subscribe({
        next:(data)=>{
          if(data){
            // alert(data);
            this.messageService.add({ severity: 'info', summary: 'Info', detail: `${data.message}` })
            this.close(); //navigate dashboard and close the form
          }
        },error:(err)=>{
          console.log(err);
          // alert(err.message);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.message}` });
        }
      });
    }else{
      // console.log("Add project called");
      this.projectService.addProject(this.projectForm.value as Project).subscribe({
        next:(data)=>{
          if(data){
            this.messageService.add({ severity: 'info', summary: 'Info', detail: `${data.message}` })
            this.close(); 
          }
        },error:(err)=>{
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.message}` });
        }
      });
      this.projectForm.reset()
    }
  }

  close(){
    this.CloseProjectEditEvent.emit();
  }
}


