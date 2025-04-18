export interface AppUser {
    id: string;
    userName: string | null;
    email: string | null;
    phoneNumber: string | null;
    fullName: string | null;
    address: string | null;
    areaId?: number;
    cityId?: number;
    governorateId?: number;
    userType: string;
    userGroupId?: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
  }