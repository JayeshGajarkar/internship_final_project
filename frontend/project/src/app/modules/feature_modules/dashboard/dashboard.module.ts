import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectTaskDisplayComponent } from './project-task-display/project-task-display.component';
import { ProjectTaskFormComponent } from './project-task-form/project-task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectDisplayComponent } from './project-display/project-display.component';
import { DashboardComponent } from './dashboard.component';
import { CommentComponent } from './comment/comment.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProjectDisplayComponent,
    ProjectFormComponent,
    ProjectTaskDisplayComponent,
    ProjectTaskFormComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
