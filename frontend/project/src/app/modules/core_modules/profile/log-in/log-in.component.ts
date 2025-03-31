import { Component } from '@angular/core';
import { AuthService } from '../../../shared_modules/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../../models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  standalone: false,
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  logInForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(private authService:AuthService,private router:Router){}

  onSubmit(){
    this.authService.logIn(this.logInForm.value as User).subscribe({
      next:(data)=>{
        localStorage.setItem('token',data.token);
        this.authService.notifyLogIn(data.user);
        alert("Login sucessful !")
        this.router.navigate(['/profile']);
      },error:(err)=>{
        console.log(err);
        alert(err.error.message);
      }
    })
  }

}
