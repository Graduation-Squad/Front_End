import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service'; // Ensure this import is correct
import { AdminDashboardDto } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Dashboard</h2>
    <div *ngIf="dashboardData">
      <p>Total Merchants: {{ dashboardData.totalMerchants }}</p>
      <p>Total Orders: {{ dashboardData.totalOrders }}</p>
      <p>Total Revenue: {{ dashboardData.totalRevenue }}</p>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  dashboardData: AdminDashboardDto | null = null;

  constructor(private dashboardService: DashboardService) {} // Ensure proper injection

  ngOnInit(): void {
    this.dashboardService.getAdminDashboard().subscribe({
      next: data => (this.dashboardData = data),
      error: err => console.error('Failed to load dashboard:', err),
    });
  }
}

export default DashboardComponent; // Add this for module export consistency