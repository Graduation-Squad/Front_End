export interface OrderDto {
    id: number;
    orderNumber: string | null;
    merchantId: number;
    areaId: number;
    cityId: number;
    governorateId: number;
    totalWeight: number;
    shippingCost: number;
    codAmount: number;
    status: string | null;
    notes: string | null;
    paymentMethodId: number;
    shippingTypeId: number;
    isVillageDelivery: boolean;
    createdAt: string;
    updatedAt: string;
    createdById: string;
    deliveryAgentId?: string;
    branchId?: number;
  }