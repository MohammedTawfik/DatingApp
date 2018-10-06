import { map } from 'rxjs/operators';
import { PaginatedResult } from './../_models/PaginatedResult';
import { IUser } from './../_models/IUser';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getUsers(pageNumber? , pageSize?): Observable<PaginatedResult<IUser[]>> {
    const paginatedResult: PaginatedResult<IUser[]> = new PaginatedResult<IUser[]>();
    let params: HttpParams = new HttpParams();
    if (pageNumber != null) {
      params = params.append('pageNumber', pageNumber);
    }
    if (pageSize != null) {
      params = params.append('pageSize', pageSize);
    }
    return this.httpClient.get<IUser[]>(this.baseUrl + 'users', {observe: 'response', params: params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        console.log('test 1');
        console.log(response.headers.getAll('Pagination'));
        if (response.headers.get('Pagination') != null) {
          console.log('test');
          paginatedResult.paginationInfo = JSON.parse(response.headers.get('Pagination'));
          console.log(paginatedResult.paginationInfo);
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

}
