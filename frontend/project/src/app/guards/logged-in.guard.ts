import { CanActivateFn } from '@angular/router';
import { AuthService } from '../modules/shared_modules/services/auth.service';
import { inject } from '@angular/core';
import { User } from '../models/user.model';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  let user:User|null=null;

  authService.currUserSubject.subscribe({
    next:(data)=>{
      user=data;
    }
  })

  if(user){
    return true;
  }
  else{
    alert("You are not logged In !")
    return false;
  }
};
