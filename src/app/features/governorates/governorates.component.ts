import { Component, OnInit } from '@angular/core';
import { GovernorateService } from '../../services/governorate.service';
import { Governorate } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-governorates',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Governorates</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let governorate of governorates">
          <td>{{ governorate.id }}</td>
          <td>{{ governorate.name }}</td>
          <td>{{ governorate.isActive ? 'Yes' : 'No' }}</td>
          <td>
            <button (click)="toggleStatus(governorate.id)">Toggle Status</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class GovernoratesComponent implements OnInit {
  governorates: Governorate[] = [];

  constructor(private governorateService: GovernorateService) {}

  ngOnInit(): void {
    this.governorateService.getGovernorates().subscribe({
      next: data => this.governorates = data,
      error: err => console.error('Failed to load governorates:', err),
    });
  }

  toggleStatus(id: number): void {
    this.governorateService.updateGovernorateStatus(id).subscribe({
      next: () => this.ngOnInit(),
      error: err => console.error('Failed to toggle status:', err),
    });
  }
}