export interface City {
    id: number;
    name: string | null;
    isActive: boolean;
    defaultShippingCost: number;
    governorateId: number;
  }
  
  export interface CityDTO {
    name: string | null;
    isActive: boolean;
    governorateId: number;
  }