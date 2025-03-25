import { CanActivateFn } from '@angular/router';

import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(@Inject(AuthService) private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // If the user is authenticated, allow access
    if (this.authService.isAuthenticated()) {
      return true;
    }

    // If not authenticated, redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
