import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'project';

  currUser!:User|null;

  constructor(private authService:AuthService,private router:Router){
    this.authService.currUserSubject$.subscribe(data=>{
        this.currUser=data;
    })
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/logIn']);
  }
}
