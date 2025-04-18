import { Component, OnInit } from '@angular/core';
import { CityService } from '../../services/city.service';
import { City } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Cities</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Governorate ID</th>
          <th>Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let city of cities">
          <td>{{ city.id }}</td>
          <td>{{ city.name }}</td>
          <td>{{ city.governorateId }}</td>
          <td>{{ city.isActive ? 'Yes' : 'No' }}</td>
          <td>
            <button (click)="toggleStatus(city.id)">Toggle Status</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class CitiesComponent implements OnInit {
  cities: City[] = [];

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.cityService.getCities().subscribe({
      next: data => this.cities = data,
      error: err => console.error('Failed to load cities:', err),
    });
  }

  toggleStatus(id: number): void {
    this.cityService.updateCityStatus(id).subscribe({
      next: () => this.ngOnInit(),
      error: err => console.error('Failed to toggle status:', err),
    });
  }
}