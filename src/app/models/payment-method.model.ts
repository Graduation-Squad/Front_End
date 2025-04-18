export interface PaymentMethod {
    id: number;
    name: string | null;
    description?: string | null;
    isActive: boolean;
    createdAt: string;
  }
  
  export interface PaymentMethodDto {
    id: number;
    name: string | null;
  }