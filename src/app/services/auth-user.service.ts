import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Iuser } from '../Models/Iuser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  // using Behavior Subject observable
  // 1-define the observable as private to be not used by any one
  private userSubjectObservable: BehaviorSubject<boolean>;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private _httpClient: HttpClient) {
    // give initialization
    this.userSubjectObservable = new BehaviorSubject<boolean>(false);
  }
  Login() {
    localStorage.setItem('token', 'safaa170194');
    this.userSubjectObservable.next(true);
  }
  Logout() {
    localStorage.removeItem('token');
    this.userSubjectObservable.next(false);
  }
  isUserLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
  // function to get value of behavior subject
  getUserSubject(): BehaviorSubject<boolean> {
    return this.userSubjectObservable;
  }
  addNewUser(newUser: Iuser): Observable<Iuser> {
    return this._httpClient.post<Iuser>(
      `${environment.baseURL}/users`,
      newUser,
      this.httpOptions
    );
  }
  getAllUser(): Observable<Iuser[]> {
    return this._httpClient.get<Iuser[]>(`${environment.baseURL}/users`);
  }
}
