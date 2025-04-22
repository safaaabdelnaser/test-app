import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthUserService } from '../services/auth-user.service';
import { ToastrService } from 'ngx-toastr';

export const authUserOnProductsGuard: CanActivateFn = (route, state) => {
  // inject the service
  let _authUserService = inject(AuthUserService);
  let _router = inject(Router);
  console.log(_authUserService);
  let _toastr = inject(ToastrService);

  if (_authUserService.isUserLogged()) {
    return true;
  } else {
    // use toastr instead of alert
    let toastrWarning = _toastr.warning(
      'you should login firstly to see products',
      'Access Denied',
      {
        timeOut: 0,
        disableTimeOut: true,
      }
    );
    // alert('you should login firstly to see products');
    // to prevent route on signin page before close toastr
    toastrWarning.onHidden.subscribe(() => {
      _router.navigate(['/signIn']);
    });
    return false;
  }
};
