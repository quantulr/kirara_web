import request from "@/lib/request.ts";
import useSWR from "swr";

interface PublicPostResponse {
  message: string;
}

interface PostForm {
  description: string;
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

interface PostListResponse {
  items: any[];
}

export const usePosts = (params: PostsParams) => {
  const { data, isLoading, error } = useSWR(
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
  };
};
