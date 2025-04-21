import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  // using Behavior Subject observable
  // 1-define the observable as private to be not used by any one
  private userSubjectObservable: BehaviorSubject<boolean>;
  constructor() {
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
}
