export interface ShippingType {
    id: number;
    name: string | null;
    additionalCost: number;
    days: number;
    isActive: boolean;
  }
  
  export interface ShippingTypeDto {
    id: number;
    name: string | null;
    additionalCost: number;
    days: number;
  }