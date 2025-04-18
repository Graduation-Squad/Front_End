export interface CreateMerchantDto {
    fullName: string;
    email: string;
    phoneNumber: string;
    storeName: string;
    pickupCost: number;
    rejectedOrdersShippingRatio: number;
    password: string;
    address: string;
  }