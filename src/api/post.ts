import request from "@/lib/request.ts";
import useSWR from "swr";

interface PublicPostResponse {
  message: string;
}

interface PostForm {
  description?: string;
  mediaIds: number[];
}

export const publicPost = (post: PostForm) => {
  return request.post<never, PublicPostResponse>("/p/publish", post);
};

interface PostsParams {
  before?: number;
  after?: number;
  perPage: number;
}

export interface Post {
  id: number;
  userId: number;
  mediaList: Media[];
  description: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: number;
  userId: number;
  postId: number;
  sort: number;
  name: string;
  path: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

export interface PostListResponse {
  items: Post[];
  next?: number;
  prev?: number;
  total?: number;
}

export const usePosts = (params: PostsParams) => {
  const { data, isLoading, error, mutate } = useSWR(
    { url: "/p/list", params },
    ({ url, params }) =>
      request.get<never, PostListResponse>(url, {
        params: params,
      })
  );
  return {
    posts: data,
    isLoading,
    isError: error,
    mutate,
  };
};
