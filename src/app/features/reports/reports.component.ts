import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Reports</h2>
    <div>
      <h3>Orders Report</h3>
      <button (click)="loadOrdersReport()">Load Orders Report</button>
      <pre *ngIf="ordersReport">{{ ordersReport | json }}</pre>
    </div>
    <div>
      <h3>Financial Report</h3>
      <button (click)="loadFinancialReport()">Load Financial Report</button>
      <pre *ngIf="financialReport">{{ financialReport | json }}</pre>
    </div>
  `,
})
export class ReportsComponent implements OnInit {
  ordersReport: any;
  financialReport: any;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {}

  loadOrdersReport(): void {
    this.reportService.getOrdersReport({}).subscribe({
      next: (data: any) => (this.ordersReport = data), // Fix: Add type annotation
      error: (err: any) => console.error('Failed to load orders report:', err), // Fix: Add type annotation
    });
  }

  loadFinancialReport(): void {
    this.reportService.getFinancialReport({}).subscribe({
      next: (data: any) => (this.financialReport = data), // Fix: Add type annotation
      error: (err: any) => console.error('Failed to load financial report:', err), // Fix: Add type annotation
    });
  }
}

export default ReportsComponent; // Add this for module export consistency