import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
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
