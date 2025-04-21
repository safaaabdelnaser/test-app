import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
  constructor(private fb: FormBuilder) {
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
      console.log(this.userForm.value);
      alert('Add user successfully');
      this.userForm.reset();
    } else {
      alert('Add user failed');
    }
  }
}
