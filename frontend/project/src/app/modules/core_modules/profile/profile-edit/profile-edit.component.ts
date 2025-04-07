import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../../models/user.model';
import { AuthService } from '../../../shared_modules/services/auth.service';

@Component({
  selector: 'app-profile-edit',
  standalone: false,
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent implements OnChanges,OnInit {

  userForm!:FormGroup;
  currUser!:User|null;
  @Input() user!:User
  @Output() closeEditUserEvent=new EventEmitter<void>();


  constructor(private userService:AuthService){}

  ngOnInit(): void {
    this.userService.currUserSubject.subscribe(data=>{
        this.currUser=data;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userForm = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      role: new FormControl(this.user.role, [Validators.required]),
    })
  }
  
  

  onSave(){
    this.userService.updateUser(this.user.userId,this.userForm.value).subscribe({
      next:(data)=>{
        if(this.currUser?.userId===this.user.userId){
          this.userService.currUserSubject.next(data);
        }
        this.close();
      },error:(err)=>{
        console.log(err);
      }
    })
  }


  close(){
    this.closeEditUserEvent.emit();
  }
}
