import { PaginatedResult } from './../_models/PaginatedResult';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from '../_models/IUser';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/User.service';

@Injectable()
export class MembersListResolver implements Resolve<IUser[]> {
    pageNumber = 1;
    pageSize = 5;
  constructor(
    private userService: UserService,
    private route: Router,
    private alertifyService: AlertifyService
  ) {}

  resolve(activateRoute: ActivatedRouteSnapshot): Observable<IUser[]> {
      return this.userService.getUsers(this.pageNumber , this.pageSize).pipe(
          catchError(error => {
              this.alertifyService.error('problem retriving member');
              this.route.navigate(['/home']);
              return of(null);
          })
      );
  }
}
