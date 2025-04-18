export interface RejectionReason {
    id: number;
    name: string | null;
    description?: string | null;
    requiresDetails: boolean;
    isActive: boolean;
    createdAt: string;
    type: string;
  }