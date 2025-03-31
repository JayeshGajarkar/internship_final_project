import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './modules/core_modules/profile/sign-in/sign-in.component';
import { LogInComponent } from './modules/core_modules/profile/log-in/log-in.component';
import { ProfileComponent } from './modules/core_modules/profile/profile/profile.component';
import { DashboardComponent } from './modules/feature_modules/dashboard/dashboard.component';
import { ProjectFormComponent } from './modules/feature_modules/dashboard/project-form/project-form.component';




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
