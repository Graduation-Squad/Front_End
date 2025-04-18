export enum DiscountType {
    Percentage = 1,
    Fixed = 2,
  }
  
  export enum OrderStatus {
    Created = 1,
    Assigned = 2,
    Processing = 3,
    Shipped = 4,
    Delivered = 5,
    Cancelled = 6,
    Returned = 7,
    Rejected = 8,
  }
  
  export enum RejectionReasonType {
    Customer = 1,
    Merchant = 2,
    Delivery = 3,
  }
  
  export enum UserType {
    Admin = 1,
    Merchant = 2,
    Employee = 3,
    DeliveryMan = 4,
    Customer = 5,
    Guest = 6,
  }