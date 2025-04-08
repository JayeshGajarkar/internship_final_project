import { Component } from '@angular/core';
import { AuthService } from '../../../shared_modules/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../../models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { spaceValidator } from '../../../shared_modules/validators/customeValidation';



@Component({
  selector: 'app-log-in',
  standalone: false,
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {

  logInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email,spaceValidator.validator]),
    password: new FormControl('', [Validators.required, Validators.minLength(6),spaceValidator.validator])
  });

  constructor(private authService:AuthService,private router:Router,private messageService:MessageService){}

  onSubmit(){
    this.authService.logIn(this.logInForm.value as User).subscribe({
      next:(data)=>{
        localStorage.setItem('token',data.token);
        this.authService.notifyLogIn(data.user);
        // alert("Login sucessful !")
        this.messageService.add({ severity: 'success', summary:'Success', detail: 'Login sucessful !' });
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 1000); 
      },error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err}` });
      }
    })
  }

}
