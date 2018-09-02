import { AlertifyService } from './../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { AuthService } from './../_services/Auth.service';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { IUser } from '../_models/IUser';
import { UserService } from '../_services/User.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberEditResolver implements Resolve<IUser> {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertifyService: AlertifyService,
    private route: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUser> {
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertifyService.error('problem retriving your data');
        this.route.navigate(['/members']);
        return of(null);
      })
    );
  }
}
