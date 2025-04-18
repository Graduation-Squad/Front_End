import { Component, OnInit } from '@angular/core';
import { ShippingTypeService } from '../../services/shipping-type.service';
import { ShippingType } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shipping-types',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Shipping Types</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Additional Cost</th>
          <th>Days</th>
          <th>Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let type of shippingTypes">
          <td>{{ type.id }}</td>
          <td>{{ type.name }}</td>
          <td>{{ type.additionalCost }}</td>
          <td>{{ type.days }}</td>
          <td>{{ type.isActive ? 'Yes' : 'No' }}</td>
          <td>
            <button (click)="toggleStatus(type.id)">Toggle Status</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class ShippingTypesComponent implements OnInit {
  shippingTypes: ShippingType[] = [];

  constructor(private shippingTypeService: ShippingTypeService) {}

  ngOnInit(): void {
    this.shippingTypeService.getShippingTypes().subscribe({
      next: data => this.shippingTypes = data,
      error: err => console.error('Failed to load shipping types:', err),
    });
  }

  toggleStatus(id: number): void {
    this.shippingTypeService.toggleShippingTypeStatus(id).subscribe({
      next: () => this.ngOnInit(),
      error: err => console.error('Failed to toggle status:', err),
    });
  }
}

export default ShippingTypesComponent; // Add this line