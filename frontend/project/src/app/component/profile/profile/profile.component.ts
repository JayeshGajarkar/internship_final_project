import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  currUser!:User;

  constructor(private authService:AuthService) {
    this.authService.currUserSubject.subscribe(data=>{
      if(data){
        this.currUser=data;
      }
    })
  }

}
