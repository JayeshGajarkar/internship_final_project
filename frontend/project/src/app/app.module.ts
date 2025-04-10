import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProfileModule } from './modules/core_modules/profile/profile.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './modules/shared_modules/shared/shared.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { HttpErrorInterceptorService } from './interceptors/http-error-interceptor.service';
import { GlobalErrorHandlerService } from './modules/shared_modules/services/global-event-handler.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProfileModule,
    SharedModule,
    RippleModule,
    ToastModule,
    FormsModule,
    HomeModule
  ],
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    }),
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },
    { 
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
