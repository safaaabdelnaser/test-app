import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthUserService } from '../../services/auth-user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  loginIcon = faSignIn;
  logoutIcon = faSignOut;

  youLoggedInOrNot!: boolean;
  constructor(private _authService: AuthUserService) {}
  ngOnInit(): void {
    // make subscription of this observable
    this._authService.getUserSubject().subscribe({
      next: (value: boolean) => {
        this.youLoggedInOrNot = value;
      },
    });
  }
}
