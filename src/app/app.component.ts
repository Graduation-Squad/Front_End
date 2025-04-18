import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountService } from './services/account.service';
import { CommonModule } from '@angular/common'; // Fix: Import CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule], // Fix: Add CommonModule
  template: `
    <header>
      <h1>Shipping System</h1>
      <nav *ngIf="isAuthenticated">
        <a routerLink="/dashboard">Dashboard</a>
        <a routerLink="/orders">Orders</a>
        <a routerLink="/areas" *ngIf="isAdmin">Areas</a>
        <a routerLink="/branches" *ngIf="isAdmin">Branches</a>
        <a routerLink="/cities" *ngIf="isAdmin">Cities</a>
        <a routerLink="/governorates" *ngIf="isAdmin">Governorates</a>
        <button (click)="logout()">Logout</button>
      </nav>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      header {
        padding: 1rem;
        background: #f8f9fa;
        border-bottom: 1px solid #ddd;
      }
      nav a {
        margin-right: 1rem;
        text-decoration: none;
        color: #007bff;
      }
      nav a:hover {
        text-decoration: underline;
      }
      main {
        padding: 1rem;
      }
    `,
  ],
})
export class AppComponent {
  isAuthenticated = !!localStorage.getItem('token');
  isAdmin = localStorage.getItem('role') === 'Admin';

  constructor(private accountService: AccountService) {}

  logout(): void {
    this.accountService.logout().subscribe({
      next: () => {
        this.isAuthenticated = false;
        window.location.href = '/login';
      },
      error: err => console.error('Logout failed:', err),
    });
  }
}

export default AppComponent; // Add this for consistency