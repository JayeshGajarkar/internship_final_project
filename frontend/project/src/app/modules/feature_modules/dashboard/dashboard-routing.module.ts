import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanBoardComponent } from '../kanban-board/kanban-board.component';
import { DashboardComponent } from './dashboard.component';
import { MyTaskComponent } from '../my-task/my-task.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { adminGuard } from '../../../guards/admin.guard';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'kanbanBoard/:projectId',component:KanbanBoardComponent},
  {path:'myTask',component:MyTaskComponent},
  {path:'addProject',component:ProjectFormComponent,canActivate:[adminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
