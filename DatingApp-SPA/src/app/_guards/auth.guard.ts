import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/Auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isUserLoggedIn()) {
      return true;
    }

    this.alertifyService.error('you shall not pass.');
    this.router.navigate(['/home']);
    return false;
  }
}
