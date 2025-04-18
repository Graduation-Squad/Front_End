import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    const allowedRoles = route.data['roles'] as string[];

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}