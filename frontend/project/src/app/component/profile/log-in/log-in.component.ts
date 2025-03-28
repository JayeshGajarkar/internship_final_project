import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';

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
        // console.log(data);
        this.authService.notifyLogIn(this.logInForm.value as User);
        alert("Login sucessful !")
        this.router.navigate(['/profile']);
      },error:(err)=>{
        console.log(err);
        alert(err.error.message);
      }
    })
  }

}
