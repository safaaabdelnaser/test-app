import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthUserService } from '../../services/auth-user.service';
import { Iuser } from './../../Models/Iuser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  // reactive form
  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _authService: AuthUserService,
    private _toastr: ToastrService
  ) {
    this.userForm = fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]{3,}$')]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      address: fb.group({
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
      }),
    });
  }
  get name() {
    return this.userForm.get('name');
  }
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }
  get city() {
    return this.userForm.get('address.city');
  }
  get street() {
    return this.userForm.get('address.street');
  }
  addUser() {
    if (this.userForm) {
      const newUser = this.userForm.value;
      console.log(this.userForm.value);
      this._authService.addNewUser(newUser).subscribe({
        next: () => {
          this._toastr.success('Add user successfully');
          this._router.navigate(['/users']);
          this.userForm.reset();
        },
        error: () => {
          this._toastr.error('Add user failed');
        },
      });
    }
  }
}
