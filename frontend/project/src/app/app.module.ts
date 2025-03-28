import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { ButtonModule } from 'primeng/button';
import { ProfileComponent } from './component/profile/profile/profile.component';
import { LogInComponent } from './component/profile/log-in/log-in.component';
import { SignInComponent } from './component/profile/sign-in/sign-in.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './component/home/home.component';
import { MenubarModule } from 'primeng/menubar';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProjectDisplayComponent } from './component/dashboard/project-display/project-display.component';
import { ProjectFormComponent } from './component/dashboard/project-form/project-form.component';
import { ProjectTaskDisplayComponent } from './component/dashboard/project-task-display/project-task-display.component';
import { ProjectTaskFormComponent } from './component/dashboard/project-task-form/project-task-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LogInComponent,
    SignInComponent,
    HomeComponent,
    DashboardComponent,
    ProjectDisplayComponent,
    ProjectFormComponent,
    ProjectTaskDisplayComponent,
    ProjectTaskFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MenubarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
