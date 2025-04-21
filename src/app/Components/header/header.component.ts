import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthUserService } from '../../services/auth-user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
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
