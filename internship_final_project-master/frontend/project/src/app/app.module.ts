import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { HttpClientModule } from '@angular/common/http';
import { ProfileModule } from './modules/core_modules/profile/profile.module';
import { DashboardModule } from './modules/feature_modules/dashboard/dashboard.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './modules/shared_modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProfileModule,
    DashboardModule,
    HomeModule,
    SharedModule
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
