import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://localhost:7001/api/auth/';
  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post(this.baseUrl + 'login', user).pipe(
      map((response: any) => {
        const userToken = response;
        if (userToken) {
          localStorage.setItem('token', userToken);
        }
      })
    );
  }
}
