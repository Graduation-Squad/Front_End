import { Component, OnInit } from '@angular/core';
import { RejectionReasonService } from '../../services/rejection-reason.service';
import { RejectionReason } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rejection-reasons',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Rejection Reasons</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let reason of rejectionReasons">
          <td>{{ reason.id }}</td>
          <td>{{ reason.name }}</td>
          <td>{{ reason.type }}</td>
          <td>{{ reason.isActive ? 'Yes' : 'No' }}</td>
          <td>
            <button (click)="toggleStatus(reason.id)">Toggle Status</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class RejectionReasonsComponent implements OnInit {
  rejectionReasons: RejectionReason[] = [];

  constructor(private rejectionReasonService: RejectionReasonService) {}

  ngOnInit(): void {
    this.rejectionReasonService.getRejectionReasons().subscribe({
      next: data => this.rejectionReasons = data,
      error: err => console.error('Failed to load rejection reasons:', err),
    });
  }

  toggleStatus(id: number): void {
    this.rejectionReasonService.toggleRejectionReason(id).subscribe({
      next: () => this.ngOnInit(),
      error: err => console.error('Failed to toggle status:', err),
    });
  }
}