import { Component } from '@angular/core';
import { User } from '../../../../models/user.model';
import { AuthService } from '../../../shared_modules/services/auth.service';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  
  userList!:User[];
  user!:User; 
  editprofileEnable:boolean=false;
  constructor(private userService:AuthService){}

  ngOnInit(){
    this.getUsers();
  }

  private getUsers(){
    this.userService.getUsers().subscribe({
      next:(data)=>{
        this.userList=data;
      },error:(err)=>{
        console.log(err);
      }
     })
  }

  editProfile(user:User){
    this.editprofileEnable=true;
    this.user=user;
  }

  closeditProfile(){
    this.editprofileEnable=false;
    this.getUsers();
  }
}
