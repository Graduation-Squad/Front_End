import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderDto } from '../../models';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Orders</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Order Number</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let order of orders">
          <td>{{ order.id }}</td>
          <td>{{ order.orderNumber }}</td>
          <td>{{ order.status }}</td>
          <td>
            <button (click)="viewOrder(order.id)">View</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class OrdersComponent implements OnInit {
  orders: OrderDto[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.getOrders({ pageNumber: 1, pageSize: 10 }).subscribe({
      next: data => this.orders = data,
      error: err => console.error('Failed to load orders:', err),
    });
  }

  viewOrder(id: number): void {
    this.router.navigate([`/orders/${id}`]);
  }
}