import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  console.log('isAuthenticatedGuard');

  //const authService = inject(AuthService)
  const router = inject(Router)

  //! if (authService.AuthStatus() === AuthStatus.authenticated) return true

  //! if (authService.AuthStatus() === AuthStatus.checking) return false

  if (localStorage.getItem('token') || localStorage.getItem('user')) {
    return true
  }

  router.navigateByUrl('/auth/noticias')
  return false;
};
