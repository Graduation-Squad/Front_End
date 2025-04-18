import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Register</h2>
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <div>
        <label>Full Name:</label>
        <input formControlName="fullName" type="text">
      </div>
      <div>
        <label>Email:</label>
        <input formControlName="email" type="email">
      </div>
      <div>
        <label>Phone Number:</label>
        <input formControlName="phoneNumber" type="text">
      </div>
      <div>
        <label>Password:</label>
        <input formControlName="password" type="password">
      </div>
      <div>
        <label>User Type:</label>
        <select formControlName="userType">
          <option value="Merchant">Merchant</option>
          <option value="Employee">Employee</option>
          <option value="DeliveryMan">DeliveryMan</option>
        </select>
      </div>
      <button type="submit" [disabled]="registerForm.invalid">Register</button>
    </form>
  `,
  styles: [`
    div { margin-bottom: 1rem; }
    label { display: inline-block; width: 100px; }
    input, select { padding: 0.5rem; }
    button { margin-top: 1rem; }
  `],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      userType: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.accountService.register(this.registerForm.value).subscribe({
        next: () => this.router.navigate(['/login']),
        error: err => console.error('Registration failed:', err),
      });
    }
  }
}