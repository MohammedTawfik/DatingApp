import { User } from './../_models/user';
import { IUser } from './../_models/IUser';
import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: IUser;

  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post(this.baseUrl + 'login', user).pipe(
      map((response: any) => {
        const loginResponse = response;
        if (loginResponse) {
          localStorage.setItem('token', loginResponse.token);
          this.decodedToken = this.jwtHelper.decodeToken(loginResponse.token);
          localStorage.setItem('currentUser', JSON.stringify(loginResponse.user));
          this.currentUser = loginResponse.user;
        }
      })
    );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  isUserLoggedIn() {
    const token = localStorage.getItem('token');
    this.jwtHelper.tokenGetter = () => localStorage.getItem('token');
    return  token != null && !this.jwtHelper.isTokenExpired();
  }
}
