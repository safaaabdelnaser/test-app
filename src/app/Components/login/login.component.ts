import { Component } from '@angular/core';
import { AuthUserService } from '../../services/auth-user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLoggedIn: boolean;
  constructor(private _userService: AuthUserService) {
    this.isLoggedIn = this._userService.isUserLogged();
  }
  login() {
    this._userService.Login();
    this.isLoggedIn = this._userService.isUserLogged();
  }
  logout() {
    this._userService.Logout();
    this.isLoggedIn = this._userService.isUserLogged();
  }
}
