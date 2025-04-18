import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { OrdersComponent } from './features/orders/orders.component';
import { AreasComponent } from './features/areas/areas.component';
import { BranchesComponent } from './features/branches/branches.component';
import { CitiesComponent } from './features/cities/cities.component';
import { GovernoratesComponent } from './features/governorates/governorates.component';
import { PaymentMethodsComponent } from './features/payment-methods/payment-methods.component';
import { ShippingTypesComponent } from './features/shipping-types/shipping-types.component';
import { ReportsComponent } from './features/reports/reports.component';
import { PermissionsComponent } from './features/permissions/permissions.component';
import { UserGroupsComponent } from './features/user-groups/user-groups.component';
import { RejectionReasonsComponent } from './features/rejection-reasons/rejection-reasons.component';
import { WeightSettingsComponent } from './features/weight-settings/weight-settings.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Merchant', 'Employee', 'DeliveryMan'] },
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Merchant', 'Employee', 'DeliveryMan'] },
  },
  {
    path: 'areas',
    component: AreasComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'branches',
    component: BranchesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'cities',
    component: CitiesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'governorates',
    component: GovernoratesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'payment-methods',
    component: PaymentMethodsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'shipping-types',
    component: ShippingTypesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Merchant'] },
  },
  {
    path: 'permissions',
    component: PermissionsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'user-groups',
    component: UserGroupsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'rejection-reasons',
    component: RejectionReasonsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'weight-settings',
    component: WeightSettingsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  { path: '**', redirectTo: 'login' },
];