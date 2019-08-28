import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { endPoints } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserModel } from './userModel';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  url = endPoints.url + 'users/';

  constructor(private _http: HttpClient) {}

  getAllUsers() {
    return this._http.get<UserModel[]>(this.url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  addUser(item: UserModel) {
    const body = JSON.stringify(item);
    let header = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url, body, {headers: header}).pipe(catchError(this.handleError));
  }

  private handleError(ex: HttpErrorResponse) {
    if (ex.error instanceof ErrorEvent) {
      console.log('Client side error', ex.message);
    } else {
      console.log('Server side error', ex.message);
    }
    return throwError('Something went wrong!');
  }
}
