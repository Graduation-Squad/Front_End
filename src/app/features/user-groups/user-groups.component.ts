import { Component, OnInit } from '@angular/core';
import { UserGroupService } from '../../services/user-group.service';
import { UserGroup } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-groups',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>User Groups</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let group of userGroups">
          <td>{{ group.id }}</td>
          <td>{{ group.name }}</td>
          <td>
            <button (click)="deleteUserGroup(group.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class UserGroupsComponent implements OnInit {
  userGroups: UserGroup[] = [];

  constructor(private userGroupService: UserGroupService) {}

  ngOnInit(): void {
    this.userGroupService.getUserGroups().subscribe({
      next: data => this.userGroups = data,
      error: err => console.error('Failed to load user groups:', err),
    });
  }

  deleteUserGroup(id: number): void {
    this.userGroupService.deleteUserGroup(id).subscribe({
      next: () => this.ngOnInit(),
      error: err => console.error('Failed to delete user group:', err),
    });
  }
}