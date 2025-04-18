export interface Area {
    id: number;
    name: string | null;
    isActive: boolean;
    cityId: number;
  }
  
  export interface AreaDTO {
    name: string | null;
    isActive: boolean;
    cityId: number;
  }