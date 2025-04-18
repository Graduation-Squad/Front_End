export interface OrderTracking {
    id: number;
    orderId: number;
    status: string;
    notes?: string | null;
    rejectionReasonId?: number | null;
    rejectionDetails?: string | null;
    timestamp: string;
    userId: string;
  }