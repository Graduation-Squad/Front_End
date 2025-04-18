export interface OrderStatusUpdateDto {
    status: string;
    rejectionReasonId?: number | null;
    rejectionDetails?: string | null;
  }