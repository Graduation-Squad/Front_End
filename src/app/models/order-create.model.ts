export interface OrderCreateDto {
    areaId: number;
    cityId: number;
    governorateId: number;
    totalWeight: number;
    paymentMethodId: number;
    deliveryOptionId: number;
    isVillageDelivery: boolean;
    branchId?: number | null;
    notes?: string | null;
  }