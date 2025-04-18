export interface Branch {
    id: number;
    name: string | null;
    address: string | null;
    phone: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface BranchDto {
    id: number;
    name: string | null;
    phone: string | null;
  }