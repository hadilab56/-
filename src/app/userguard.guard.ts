import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core' ;
export const userGuard: CanActivateFn = (route, state) => {

  if(sessionStorage.getItem('email') && sessionStorage.getItem('role')=='user' ){
    
    return true ;
  }else{
    const router = inject(Router);
    return router.navigate(['login']);
  }
};
