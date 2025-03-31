import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  currUser!:User | null;
  currUserSubject=new BehaviorSubject(this.currUser);

  constructor(private http:HttpClient) {
    const user=localStorage.getItem('user');
    if(user){
      this.currUserSubject.next(JSON.parse(user));
    }
  }
  
  signIn(user:User):Observable<any>{
    return this.http.post(`http://localhost:3000/user/signIn`,user);
  }


  logIn(user:User):Observable<any>{
    return this.http.post(`http://localhost:3000/user/logIn`,user);
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currUserSubject.next(null);
  }

  notifyLogIn(user:User){
    this.currUser=user;
    localStorage.setItem('user',JSON.stringify(user));
    this.currUserSubject.next(user);
  }

  getUsers():Observable<any>{; 
    return this.http.get(`http://localhost:3000/user/all`)
  }

  getUserByRole(role:string):Observable<any>{
    return this.http.get(`http://localhost:3000/user/${role}`);
  }
}
