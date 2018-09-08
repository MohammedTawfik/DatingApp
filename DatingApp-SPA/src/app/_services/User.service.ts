import { IUser } from './../_models/IUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.baseUrl + 'users');
  }

  getUser(userId: number): Observable<IUser> {
    return this.httpClient.get<IUser>(this.baseUrl + 'users/' + userId);
  }

  updateUser(userId: number, user: IUser) {
    return this.httpClient.put(this.baseUrl + 'users/' + userId , user);
  }

  setUserMainPhoto(userId: number, photoId: number) {
    return this.httpClient.post(this.baseUrl + 'users/' + userId + '/photos/' + photoId + '/setmain', {});
  }

  deleteUserPhoto(userId: number, photoId: number) {
    return this.httpClient.delete(this.baseUrl + 'users/' + userId + '/photos/' + photoId);
  }

}
