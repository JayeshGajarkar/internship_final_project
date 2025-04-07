import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared_modules/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../../models/user.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  otp!:string;
  otpSent:boolean=false;
  otpVerified:boolean=false;
  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('Employee', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

  ngOnInit() { }

  onSubmit() {
    if(this.otpVerified){
      this.authService.signUp((this.signUpForm.value) as User).subscribe({
        next: (data) => {
          this.authService.notifyLogIn(data.user);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${data.message}` });
          setTimeout(() => {
            this.router.navigate(['/profile']);
          }, 1000);
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
        }
      })
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: `Email is not verfied` });
    }
  }

  sendOtp() {
    if (this.signUpForm.value.email) {
      this.authService.sendOtpForSignUp(this.signUpForm.value.email).subscribe({
        next: (data) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${data.message}` });
          this.otpSent=true;
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
          this.otpSent=false;
        }
      })
    }
  }

 
  verifyOtp(): void {
    if(this.otp){
      this.authService.verifyOtp(this.signUpForm.value.email!,this.otp).subscribe({
        next: (data) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${data.message}` });
          this.otpVerified = true;
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
          this.otpVerified=false;
        }
      })
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: `Enter OTP` });
      this.otpVerified=false;
    }
  }

}
