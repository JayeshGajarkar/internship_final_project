import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared_modules/services/auth.service';
import { User } from '../../../../models/user.model';
import { FormGroup} from '@angular/forms';


@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  currUser!:User|null;
  editProfileEnable:boolean=false;
  userForm!:FormGroup;

  constructor(private authService:AuthService) {};

  ngOnInit(): void {
    this.authService.currUserSubject$.subscribe(data=>{
        this.currUser=data;
    })
  }

  editProfile(){
    this.editProfileEnable=true;    
  }

  closeEditProfile(){
    this.editProfileEnable=false;
  }

}
