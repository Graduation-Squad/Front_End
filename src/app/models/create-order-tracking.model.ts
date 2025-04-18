export interface CreateOrderTrackingDto {
    status: string;
    notes?: string | null;
    rejectionReasonId?: number | null;
    rejectionDetails?: string | null;
  }