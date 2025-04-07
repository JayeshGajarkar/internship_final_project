import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../modules/shared_modules/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  currUser!:User|null;
  constructor(private userService:AuthService){}

  ngOnInit(): void {
    this.userService.currUserSubject.subscribe(user=>{
      this.currUser=user;
    })
  } 
}
