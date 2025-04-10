import { CanActivateFn } from '@angular/router';
import { AuthService } from '../modules/shared_modules/services/auth.service';
import { inject } from '@angular/core';


export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  let role:string|undefined='';

  authService.currUserSubject.subscribe({
    next: (data) => {
      role = data?.role;
    }
  })

  if (role==="Admin") {
    return true;
  }
  else {
    alert("You are not admin to acess this page !")
    return false;
  }
};
