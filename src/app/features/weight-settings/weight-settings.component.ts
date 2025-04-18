import { Component, OnInit } from '@angular/core';
import { WeightSettingsService } from '../../services/weight-settings.service';
import { WeightSetting } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weight-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Weight Settings</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Base Weight</th>
          <th>Base Price</th>
          <th>Additional Price</th>
          <th>Governorate ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let setting of weightSettings">
          <td>{{ setting.id }}</td>
          <td>{{ setting.baseWeight }}</td>
          <td>{{ setting.baseWeightPrice }}</td>
          <td>{{ setting.additionalWeightPrice }}</td>
          <td>{{ setting.governorateId }}</td>
          <td>
            <button (click)="deleteSetting(setting.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class WeightSettingsComponent implements OnInit {
  weightSettings: WeightSetting[] = [];

  constructor(private weightSettingsService: WeightSettingsService) {}

  ngOnInit(): void {
    this.weightSettingsService.getWeightSettings().subscribe({
      next: data => this.weightSettings = data,
      error: err => console.error('Failed to load weight settings:', err),
    });
  }

  deleteSetting(id: number): void {
    this.weightSettingsService.deleteWeightSetting(id).subscribe({
      next: () => this.ngOnInit(),
      error: err => console.error('Failed to delete weight setting:', err),
    });
  }
}