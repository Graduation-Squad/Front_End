import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../services/permission.service';
import { Permission } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Permissions</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Module</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let permission of permissions">
          <td>{{ permission.id }}</td>
          <td>{{ permission.name }}</td>
          <td>{{ permission.module }}</td>
          <td>
            <button (click)="deletePermission(permission.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class PermissionsComponent implements OnInit {
  permissions: Permission[] = [];

  constructor(private permissionService: PermissionService) {}

  ngOnInit(): void {
    this.permissionService.getPermissions().subscribe({
      next: data => this.permissions = data,
      error: err => console.error('Failed to load permissions:', err),
    });
  }

  deletePermission(id: number): void {
    this.permissionService.deletePermission(id).subscribe({
      next: () => this.ngOnInit(),
      error: err => console.error('Failed to delete permission:', err),
    });
  }
}