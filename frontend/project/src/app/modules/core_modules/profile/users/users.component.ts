import { Component } from '@angular/core';
import { User } from '../../../../models/user.model';
import { AuthService } from '../../../shared_modules/services/auth.service';
import { MessageService } from 'primeng/api';

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

  constructor(private userService:AuthService,private messageService:MessageService){}

  ngOnInit(){
    this.getUsers();
  }

  private getUsers(){
    this.userService.getUsers().subscribe({
      next:(data)=>{
        this.userList=data;
      },error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err}` });
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

  deleteUser(userId:number){
    this.userService.deleteUser(userId).subscribe({
      next:(data)=>{
        this.getUsers();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `${data.message}` });
      },error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err}` });
      }
    })
  }
}
