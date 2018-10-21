import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IUser } from './../_models/IUser';
import { PaginatedResult } from './../_models/PaginatedResult';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getUsers(pageNumber? , pageSize? , userFilterParams? , likers?): Observable<PaginatedResult<IUser[]>> {
    const paginatedResult: PaginatedResult<IUser[]> = new PaginatedResult<IUser[]>();
    let params: HttpParams = new HttpParams();
    if (pageNumber != null) {
      params = params.append('pageNumber', pageNumber);
    }
    if (pageSize != null) {
      params = params.append('pageSize', pageSize);
    }
    if (userFilterParams != null) {
      params = params.append('minAge', userFilterParams.minAge);
      params = params.append('maxAge', userFilterParams.maxAge);
      params = params.append('gender', userFilterParams.gender);
      params = params.append('orderBy', userFilterParams.orderBy);
    }

    if (likers === 'liker') {
      params = params.append('liker', 'true');
    }
    if (likers === 'likee') {
      params = params.append('likee', 'true');
    }
    return this.httpClient.get<IUser[]>(this.baseUrl + 'users', {observe: 'response', params: params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.paginationInfo = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
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

  sendLike(userId: number , receipintId: number) {
    return this.httpClient.post(this.baseUrl + 'users/' + userId + '/like/' + receipintId, {});
  }
}
