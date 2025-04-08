import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './modules/core_modules/profile/sign-up/sign-up.component';
import { LogInComponent } from './modules/core_modules/profile/log-in/log-in.component';
import { ProfileComponent } from './modules/core_modules/profile/profile/profile.component';
import { UsersComponent } from './modules/core_modules/profile/users/users.component';
import { AboutComponent } from './home/about/about.component';
import { ContactComponent } from './home/contact/contact.component';
import { PrivacyPolicyComponent } from './home/privacy-policy/privacy-policy.component';
import { ForgotPasswordComponent } from './modules/core_modules/profile/forgot-password/forgot-password.component';
import { adminGuard } from './guards/admin.guard';
import { loggedInGuard } from './guards/logged-in.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent},
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'logIn', component: LogInComponent },
  { path: 'profile', component: ProfileComponent,canActivate:[loggedInGuard]},
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'dashboard', loadChildren: () => import('./modules/feature_modules/dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[loggedInGuard]},
  { path: 'employee', component: UsersComponent,canActivate:[adminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
