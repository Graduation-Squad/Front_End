import { OrderStatusCountDto } from '././order-status-count.model';

export interface EmployeeDashboardDto {
  createdOrders: number;
  assignedOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  returnedOrders: number;
  rejectedOrders: number;
  totalCODCollected: number;
  statusCounts: OrderStatusCountDto[];
}