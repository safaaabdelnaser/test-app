import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthUserService } from '../services/auth-user.service';

export const authUserOnProductsGuard: CanActivateFn = (route, state) => {
  // inject the service
  let _authUserService = inject(AuthUserService);
  let _router = inject(Router);
  console.log(_authUserService);
  if (_authUserService.isUserLogged()) {
    return true;
  } else {
    alert('you should login firstly to see products');
    _router.navigate(['/login']);
    return false;
  }
};
