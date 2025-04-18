export interface DeliveryMan {
    id: number;
    vehicleNumber: string | null;
    licenseNumber: string | null;
    discountType: number;
    discountValue: number;
    appUserId: string;
  }
  
  export interface DeliveryManDto {
    id: number;
    fullName: string | null;
    vehicleNumber: string | null;
    licenseNumber: string | null;
    discountType: number;
    discountValue: number;
  }