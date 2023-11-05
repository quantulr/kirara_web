import request from "@/lib/request.ts";
import useSWR from "swr";
import {
  ImageHistoryResponse,
  // ImageHistoryResponseItem,
} from "@/types/image-history-response.ts";
import { AxiosProgressEvent } from "axios";

interface UploadMediaResponse {
  id: number;
  userId: number;
  postId?: number;
  name: string;
  path: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

// 上传媒体
export const uploadMedia = (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);
  return request.post<never, UploadMediaResponse>("/v/upload", formData, {
    onUploadProgress,
  });
};

/**
 * 获取图片历史
 * @param params
 */
export const useImageHistory = (params: { page: number; perPage: number }) => {
  const { data, error, isLoading } = useSWR(
    {
      url: `/image/history`,
      params,
    },
    ({ url, params }) =>
      request.get<never, ImageHistoryResponse>(url, {
        params,
      }),
  );

  return new Promise((resolve, reject) => {
    if (error) {
      reject(error);
    }
    if (isLoading) {
      return;
    }
    resolve({
      list: data?.items ?? [],
      nextPage: params.page + 1,
      hasNext: data?.hasNext ?? false,
    });
  });
};

// 图片上传历史
export const getImageHistory = async (params: {
  page: number;
  perPage: number;
}) => {
  const res = await request.get<never, ImageHistoryResponse>("/image/history", {
    params,
  });
  return {
    list: res.items,
    nextPage: params.page + 1,
    hasNext: res.hasNext,
  };
};
