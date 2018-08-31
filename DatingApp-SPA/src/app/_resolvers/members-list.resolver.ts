import { IUser } from '../_models/IUser';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/User.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MembersListResolver implements Resolve<IUser[]> {
  constructor(
    private userService: UserService,
    private route: Router,
    private alertifyService: AlertifyService
  ) {}

  resolve(activateRoute: ActivatedRouteSnapshot): Observable<IUser[]> {
      return this.userService.getUsers().pipe(
          catchError(error => {
              this.alertifyService.error('problem retriving member');
              this.route.navigate(['/home']);
              return of(null);
          })
      );
  }
}
