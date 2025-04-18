import { Component, OnInit } from '@angular/core';
import { AreaService } from '../../services/area.service';
import { Area } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Areas</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>City ID</th>
          <th>Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let area of areas">
          <td>{{ area.id }}</td>
          <td>{{ area.name }}</td>
          <td>{{ area.cityId }}</td>
          <td>{{ area.isActive ? 'Yes' : 'No' }}</td>
          <td>
            <button (click)="toggleStatus(area.id)">Toggle Status</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class AreasComponent implements OnInit {
  areas: Area[] = [];

  constructor(private areaService: AreaService) {}

  ngOnInit(): void {
    this.areaService.getAreas().subscribe({
      next: data => this.areas = data,
      error: err => console.error('Failed to load areas:', err),
    });
  }

  toggleStatus(id: number): void {
    this.areaService.updateAreaStatus(id).subscribe({
      next: () => this.ngOnInit(),
      error: err => console.error('Failed to toggle status:', err),
    });
  }
}