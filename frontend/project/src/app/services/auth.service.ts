import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {}

  currUser!:User | null;
  currUserSubject=new BehaviorSubject(this.currUser);
  
  signIn(user:User):Observable<any>{
    return this.http.post(`http://localhost:3000/user/signIn`,user);
  }

  getUsers():Observable<any>{; 
    return this.http.get(`http://localhost:3000/user`)
  }

  logIn(user:User):Observable<any>{
    return this.http.post(`http://localhost:3000/user/logIn`,user);
  }

  logOut(){
    localStorage.removeItem('token');
    this.currUserSubject.next(null);
  }

  notifyLogIn(user:User){
    this.currUser=user;
    this.currUserSubject.next(user);
  }
}
