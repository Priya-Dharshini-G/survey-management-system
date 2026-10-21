import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
/**
 * Method which is used to verify the user login.
 */
export const authGuard: CanActivateFn = () => {
  const route = inject(Router);
  const user = sessionStorage.getItem('user');
  if (user != null) {
    return true;
  }
  return route.navigate(['/login']);
};
