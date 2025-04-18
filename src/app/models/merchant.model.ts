export interface Merchant {
    id: number;
    storeName: string | null;
    pickupCost: number;
    rejectedOrdersShippingRatio: number;
    appUserId: string;
  }
  
  export interface MerchantDto {
    id: number;
    fullName: string | null;
    storeName: string | null;
    pickupCost: number;
    rejectedOrdersShippingRatio: number;
  }