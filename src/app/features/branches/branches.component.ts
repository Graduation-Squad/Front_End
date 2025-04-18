import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../services/branch.service';
import { Branch } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Branches</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let branch of branches">
          <td>{{ branch.id }}</td>
          <td>{{ branch.name }}</td>
          <td>{{ branch.phone }}</td>
          <td>{{ branch.isActive ? 'Yes' : 'No' }}</td>
          <td>
            <button (click)="toggleStatus(branch.id)">Toggle Status</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class BranchesComponent implements OnInit {
  branches: Branch[] = [];

  constructor(private branchService: BranchService) {}

  ngOnInit(): void {
    this.branchService.getBranches().subscribe({
      next: data => this.branches = data,
      error: err => console.error('Failed to load branches:', err),
    });
  }

  toggleStatus(id: number): void {
    this.branchService.updateBranchStatus(id).subscribe({
      next: () => this.ngOnInit(),
      error: err => console.error('Failed to toggle status:', err),
    });
  }
}