import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';

  isLoggedIn:boolean=false;

  constructor(private authService:AuthService,private router:Router){
    this.authService.currUserSubject.subscribe(data=>{
      if(data){
        this.isLoggedIn=true;
      }
    })
  }

  logOut(){
    this.isLoggedIn=false;
    this.authService.logOut();
    this.router.navigate(['/logIn']);
  }
}
