import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './component/profile/sign-in/sign-in.component';
import { LogInComponent } from './component/profile/log-in/log-in.component';
import { ProfileComponent } from './component/profile/profile/profile.component';
import { HomeComponent } from './component/home/home.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProjectFormComponent } from './component/dashboard/project-form/project-form.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'signIn',component:SignInComponent},
  {path:'logIn',component:LogInComponent},
  {path:'profile',component:ProfileComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'addProject',component:ProjectFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
