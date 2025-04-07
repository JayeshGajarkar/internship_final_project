import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared_modules/services/auth.service';
import { User } from '../../../../models/user.model';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: false
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  otp!: string;
  otpSent = false;
  otpVerified = false;

  constructor(private authService: AuthService,private messageService:MessageService,private router:Router) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  sendOtp(): void {
    this.authService.sendOtpForPassword(this.forgotPasswordForm.value.email).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `${data.message}` });
        this.otpSent = true;
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
        this.otpSent = false;
      }
    })
  }

  verifyOtp(): void {
    if (this.otp) {
      this.authService.verifyOtp(this.forgotPasswordForm.value.email, this.otp).subscribe({
        next: (data) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${data.message}` });
          this.otpVerified = true;
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
          this.otpVerified = false;
        }
      })
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: `Enter OTP` });
      this.otpVerified = false;
    }
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid && this.otpVerified) {
      this.authService.changePassword(this.forgotPasswordForm.value).subscribe({
        next: (data) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${data.message}` });
          
          setTimeout(()=>{
            this.router.navigate(['/logIn']);
          },1000);
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
        }
      })
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: `OTP is not verifiesd !` });
    }
  }
}