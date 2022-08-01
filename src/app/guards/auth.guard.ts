import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (this.authService.isLoggedIn()) {
            const userRole = this.authService.getRole();
            if (route.data.role && route.data.role.indexOf(userRole) === -1) {
                this.router.navigate(['home']);
                return false;
            }
            return true;
        } else {
            this.router.navigate(['home']);
        }

        return false;
    }
}
