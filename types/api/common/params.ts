export interface DefaultParams {
  successCallback?: (...data: any) => void;
  errorCallback?: (...data: any) => void;
  enabled?: boolean;
}

export interface PageParams extends DefaultParams {
  page: number;
  size: number;
  search?: string;
  ascending?: boolean;
  sort_field?: string;
}
