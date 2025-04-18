import { OrderStatusCountDto } from '././order-status-count.model';
import { RevenueByBranchDto } from '././revenue-by-branch.model';

export interface AdminDashboardDto {
  totalMerchants: number;
  totalDeliveryAgents: number;
  totalOrders: number;
  totalRevenue: number;
  statusCounts?: OrderStatusCountDto[];
  revenueByBranch?: RevenueByBranchDto[];
}