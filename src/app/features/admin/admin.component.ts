// src/app/features/admin/components/admin/admin.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as Models from '../../models'; 

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  users: Models.AppUser[] = [];
  orders: Models.OrderDto[] = [];
  paymentMethods: Models.PaymentMethod[] = [];
  permissions: Models.Permission[] = [];
  rejectionReasons: Models.RejectionReason[] = [];
  shippingTypes: Models.ShippingType[] = [];
  userGroups: Models.UserGroup[] = [];
  weightSettings: Models.WeightSetting[] = [];
  areas: Models.Area[] = [];
  userColumns: string[] = ['id', 'email', 'role'];
  orderColumns: string[] = ['id', 'customer', 'status'];
  paymentMethodColumns: string[] = ['id', 'name'];
  permissionColumns: string[] = ['id', 'name'];
  rejectionReasonColumns: string[] = ['id', 'reason'];
  shippingTypeColumns: string[] = ['id', 'type'];
  userGroupColumns: string[] = ['id', 'name'];
  weightSettingColumns: string[] = ['id', 'weight'];
  areaColumns: string[] = ['id', 'name', 'cityId', 'isActive', 'actions'];
  merchant: Models.CreateMerchantDto = {
    fullName: '',
    email: '',
    phoneNumber: '',
    storeName: '',
    pickupCost: 0,
    rejectedOrdersShippingRatio: 0,
    password: '',
    address: ''
  };


  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadOrders();
    this.loadPaymentMethods();
    this.loadPermissions();
    this.loadRejectionReasons();
    this.loadShippingTypes();
    this.loadUserGroups();
    this.loadWeightSettings();
  }

  loadUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next: (users: Models.AppUser[]) => this.users = users,
      error: (err: unknown) => this.snackBar.open('Failed to load users', 'Close', { duration: 3000 })
    });
  }

  loadOrders(): void {
    this.adminService.getAllOrders().subscribe({
      next: (orders: Models.OrderDto[]) => this.orders = orders,
      error: (err: unknown) => this.snackBar.open('Failed to load orders', 'Close', { duration: 3000 })
    });
  }

  loadPaymentMethods(): void {
    this.adminService.getAllPaymentMethods().subscribe({
      next: (methods: Models.PaymentMethod[]) => this.paymentMethods = methods,
      error: (err: unknown) => this.snackBar.open('Failed to load payment methods', 'Close', { duration: 3000 })
    });
  }

  loadPermissions(): void {
    this.adminService.getAllPermissions().subscribe({
      next: (permissions: Models.Permission[]) => this.permissions = permissions,
      error: (err: unknown) => this.snackBar.open('Failed to load permissions', 'Close', { duration: 3000 })
    });
  }

  loadRejectionReasons(): void {
    this.adminService.getAllRejectionReasons().subscribe({
      next: (reasons: Models.RejectionReason[]) => this.rejectionReasons = reasons,
      error: (err: unknown) => this.snackBar.open('Failed to load rejection reasons', 'Close', { duration: 3000 })
    });
  }

  loadShippingTypes(): void {
    this.adminService.getAllShippingTypes().subscribe({
      next: (types: Models.ShippingType[]) => this.shippingTypes = types,
      error: (err: unknown) => this.snackBar.open('Failed to load shipping types', 'Close', { duration: 3000 })
    });
  }

  loadUserGroups(): void {
    this.adminService.getAllUserGroups().subscribe({
      next: (groups: Models.UserGroup[]) => this.userGroups = groups,
      error: (err: unknown) => this.snackBar.open('Failed to load user groups', 'Close', { duration: 3000 })
    });
  }

  loadWeightSettings(): void {
    this.adminService.getAllWeightSettings().subscribe({
      next: (settings: Models.WeightSetting[]) => this.weightSettings = settings,
      error: (err: unknown) => this.snackBar.open('Failed to load weight settings', 'Close', { duration: 3000 })
    });
  }
   
  updateRole(user: Models.AppUser): void {
    if (user.userName) { // Guard against null userName
      this.adminService.updateUserRole(user.userName, user.userType).subscribe({
        next: () => this.snackBar.open('Role updated successfully', 'Close', { duration: 3000 }),
        error: (err: unknown) => this.snackBar.open('Failed to update role', 'Close', { duration: 3000 })
      });
    } else {
      this.snackBar.open('Cannot update role: userName is missing', 'Close', { duration: 3000 });
    }
  }


  createMerchant(): void {
    this.adminService.createMerchant(this.merchant).subscribe({
      next: () => {
        this.snackBar.open('Merchant created successfully', 'Close', { duration: 3000 });
        this.merchant = {
          fullName: '',
          email: '',
          phoneNumber: '',
          storeName: '',
          pickupCost: 0,
          rejectedOrdersShippingRatio: 0,
          password: '',
          address: ''
        };
      },
      error: (err: unknown) => this.snackBar.open('Failed to create merchant', 'Close', { duration: 3000 })
    });
  }
}