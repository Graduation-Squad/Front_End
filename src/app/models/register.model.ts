export interface RegisterRequest {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    userType: string;
    userGroupId?: number;
  }
  
  export interface RegisterResponse {
    userId: string;
    fullName: string;
    email: string;
    username: string;
    userType: string;
    role: string;
  }