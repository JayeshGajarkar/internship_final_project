import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  singUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('User', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private authService:AuthService,private router:Router){}

  ngOnInit() { }

  onSubmit() {

    this.authService.signIn((this.singUpForm.value) as User).subscribe({
      next: (data) => {
        //console.log(data);
        this.router.navigate(['/logIn']);
        this.authService.notifyLogIn(this.singUpForm.value as User);
        alert(data.message)
      },
      error: (err) => {
        // console.log(err);
        alert(err.message);
      }
    })
  }
}
