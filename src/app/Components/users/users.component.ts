import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../../services/auth-user.service';
import { Iuser } from '../../Models/Iuser';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';

ModuleRegistry.registerModules([ClientSideRowModelModule]);
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  userList: Iuser[] = [];
  colDefs: ColDef<Iuser>[] = [
    { field: 'name', headerName: 'Full Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'password', headerName: 'Password' },
    { field: 'address.city', headerName: 'City' },
    { field: 'address.street', headerName: 'Street' },
  ];

  defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    filter: true,
  };
  constructor(private _authService: AuthUserService) {}
  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this._authService.getAllUser().subscribe({
      next: (response) => {
        this.userList = response;
        console.log('user data:', this.userList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
