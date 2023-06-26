export interface ImageHistoryResponse {
  total: number;
  totalPages: number;
  hasNext: boolean;
  items: ImageHistoryResponseItem[];
}

export interface ImageHistoryResponseItem {
  id: number;
  filePath: string;
  fileName: string;
  size: number;
  width: number;
  height: number;
  uploadTime: number;
}
