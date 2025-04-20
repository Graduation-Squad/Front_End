import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VillageService } from '../../services/village.service';
import { Village, PaginatedResult, PaginationParams } from '../../models/village.models';

@Component({
  selector: 'app-villages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Villages</h2>

    <section>
      <h3>Filter Villages</h3>
      <form (ngSubmit)="loadVillages()">
        <input [(ngModel)]="params.cityId" name="cityId" type="number" placeholder="City ID" />
        <input [(ngModel)]="params.governorateId" name="governorateId" type="number" placeholder="Governorate ID" />
        <input [(ngModel)]="params.name" name="name" placeholder="Village Name" />
        <input [(ngModel)]="params.pageNumber" name="pageNumber" type="number" placeholder="Page Number" required />
        <input [(ngModel)]="params.pageSize" name="pageSize" type="number" placeholder="Page Size" required />
        <button type="submit">Filter Villages</button>
      </form>
    </section>

    <section>
      <h3>Villages by City</h3>
      <form (ngSubmit)="loadVillagesByCity()">
        <input [(ngModel)]="cityId" name="cityId" type="number" placeholder="City ID" required />
        <button type="submit">Get Villages by City</button>
      </form>
    </section>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>City ID</th>
          <th>Governorate ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let village of villages">
          <td>{{ village.id }}</td>
          <td>{{ village.name }}</td>
          <td>{{ village.cityId }}</td>
          <td>{{ village.governorateId }}</td>
          <td>
            <button (click)="viewVillageDetails(village.id)">View Details</button>
          </td>
        </tr>
      </tbody>
    </table>

    <section *ngIf="selectedVillage">
      <h3>Village Details</h3>
      <p>ID: {{ selectedVillage.id }}</p>
      <p>Name: {{ selectedVillage.name }}</p>
      <p>City ID: {{ selectedVillage.cityId }}</p>
      <p>Governorate ID: {{ selectedVillage.governorateId }}</p>
      <button (click)="selectedVillage = null">Close</button>
    </section>

    <section *ngIf="pagination">
      <p>Page {{ pagination.currentPage }} of {{ pagination.totalPages }}</p>
      <button (click)="changePage(params.pageNumber - 1)" [disabled]="params.pageNumber <= 1">Previous</button>
      <button (click)="changePage(params.pageNumber + 1)" [disabled]="!pagination || params.pageNumber >= pagination.totalPages">Next</button>
    </section>
  `,
  styles: [
    `
      section {
        margin-bottom: 2rem;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 400px;
      }
      input {
        padding: 0.5rem;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 0.5rem;
        text-align: left;
      }
      button {
        padding: 0.5rem;
        margin-right: 0.5rem;
        background: #007bff;
        color: white;
        border: none;
        cursor: pointer;
      }
      button:hover {
        background: #0056b3;
      }
      button:disabled {
        background: #6c757d;
        cursor: not-allowed;
      }
    `,
  ],
})
export class VillagesComponent implements OnInit {
  villages: Village[] = [];
  selectedVillage: Village | null = null;
  pagination: { currentPage: number; totalPages: number; pageSize: number; totalItems: number } | null = null;
  params: PaginationParams = {
    pageNumber: 1,
    pageSize: 10,
  };
  cityId: number | null = null;

  constructor(private villageService: VillageService) {}

  ngOnInit(): void {
    this.loadVillages();
  }

  loadVillages(): void {
    this.villageService.getVillages(this.params).subscribe({
      next: (result: PaginatedResult<Village>) => {
        this.villages = result.items;
        this.pagination = {
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          pageSize: result.pageSize,
          totalItems: result.totalItems,
        };
      },
      error: err => console.error('Failed to load villages:', err),
    });
  }

  loadVillagesByCity(): void {
    if (this.cityId) {
      this.villageService.getVillagesByCity(this.cityId).subscribe({
        next: (villages: Village[]) => {
          this.villages = villages;
          this.pagination = null; // Reset pagination for city-specific results
        },
        error: err => console.error('Failed to load villages by city:', err),
      });
    }
  }

  viewVillageDetails(id: number): void {
    this.villageService.getVillageById(id).subscribe({
      next: (village: Village) => {
        this.selectedVillage = village;
      },
      error: err => console.error('Failed to load village details:', err),
    });
  }

  changePage(pageNumber: number): void {
    if (this.pagination && pageNumber >= 1 && pageNumber <= this.pagination.totalPages) {
      this.params.pageNumber = pageNumber;
      this.loadVillages();
    }
  }
}

export default VillagesComponent;