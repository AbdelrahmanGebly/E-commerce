import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('userToken')){
    return true;
  }else{
    let _Router = inject(Router);
    _Router.navigate(['signin'])
    return false;
  }
};
