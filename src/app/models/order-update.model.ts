export interface OrderUpdateDto {
    areaId: number;
    cityId: number;
    governorateId: number;
    totalWeight: number;
    paymentMethodId: number;
    deliveryOptionId: number;
    isVillageDelivery: boolean;
    notes?: string | null;
  }