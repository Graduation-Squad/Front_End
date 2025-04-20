export interface Village {
  id: number;
  name: string;
  cityId: number;
  governorateId: number;
}

export interface PaginatedResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
  cityId?: number;
  governorateId?: number;
  name?: string;
}