import request from "@/lib/request.ts";

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
