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
import { KanbanBoardComponent } from '../kanban-board/kanban-board.component';
import { FilterByStatusPipe } from '../pipes/filter-by-status.pipe';
import { ToastModule } from 'primeng/toast';
import { ChartsComponent } from '../kanban-board/charts/charts.component';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { MyTaskComponent } from '../my-task/my-task.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    DashboardComponent,
    ProjectDisplayComponent,
    ProjectFormComponent,
    ProjectTaskDisplayComponent,
    ProjectTaskFormComponent,
    KanbanBoardComponent,
    CommentComponent,
    FilterByStatusPipe,
    ChartsComponent,
    MyTaskComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ChartModule,
    ButtonModule,
    TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, DropdownModule, HttpClientModule, CommonModule
  ],
})
export class DashboardModule { }
