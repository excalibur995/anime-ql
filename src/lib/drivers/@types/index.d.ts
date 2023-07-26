declare interface Pagination {
  page: number;
  perPage: number;
}

declare interface PageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: Boolean;
  perPage: number;
}

declare interface PageResult {
  pageInfo: PageInfo!;
}
