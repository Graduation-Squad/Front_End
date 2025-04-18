import { OrderStatusCountDto } from '././order-status-count.model';
import { WeeklyOrderStatsDto } from '././weekly-order-stats.model';

export interface MerchantDashboardDto {
  totalOrders: number;
  createdOrders: number;
  assignedOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  returnedOrders: number;
  rejectedOrders: number;
  totalRevenue: number;
  statusCounts: OrderStatusCountDto[];
  weeklyStats: WeeklyOrderStatsDto[];
}