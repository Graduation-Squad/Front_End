export interface Permission {
    id: number;
    name: string | null;
    description?: string | null;
    module: string | null;
  }
  
  export interface PermissionRequest {
    name: string;
    description?: string | null;
    module: string;
  }