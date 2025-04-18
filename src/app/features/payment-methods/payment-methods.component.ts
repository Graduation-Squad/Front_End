import { Component, OnInit } from '@angular/core';
import { PaymentMethodService } from '../../services/payment-method.service';
import { PaymentMethod } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Payment Methods</h2>
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
        <tr *ngFor="let method of paymentMethods">
          <td>{{ method.id }}</td>
          <td>{{ method.name }}</td>
          <td>{{ method.isActive ? 'Yes' : 'No' }}</td>
          <td>
            <button (click)="toggleStatus(method.id)">Toggle Status</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class PaymentMethodsComponent implements OnInit {
  paymentMethods: PaymentMethod[] = [];

  constructor(private paymentMethodService: PaymentMethodService) {}

  ngOnInit(): void {
    this.paymentMethodService.getPaymentMethods().subscribe({
      next: data => this.paymentMethods = data,
      error: err => console.error('Failed to load payment methods:', err),
    });
  }

  toggleStatus(id: number): void {
    this.paymentMethodService.togglePaymentMethod(id).subscribe({
      next: () => this.ngOnInit(),
      error: err => console.error('Failed to toggle status:', err),
    });
  }
}

export default PaymentMethodsComponent; // Explicit export to ensure module recognition