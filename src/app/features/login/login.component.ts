import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Login</h2>
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <div>
        <label>Email:</label>
        <input formControlName="email" type="email">
        <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
          Email is required and must be valid.
        </div>
      </div>
      <div>
        <label>Password:</label>
        <input formControlName="password" type="password">
        <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
          Password is required.
        </div>
      </div>
      <button type="submit" [disabled]="loginForm.invalid">Login</button>
    </form>
  `,
  styles: [`
    div { margin-bottom: 1rem; }
    label { display: inline-block; width: 100px; }
    input { padding: 0.5rem; }
    button { margin-top: 1rem; }
  `],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: err => console.error('Login failed:', err),
      });
    }
  }
}