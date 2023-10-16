import CreatePost from "@/components/CreatePost.tsx";
import PageScaffold from "@/components/PageScaffold.tsx";
import { AddIcon } from "@chakra-ui/icons";
import { IconButton, Image } from "@chakra-ui/react";
import { useState } from "react";
import { PostListResponse } from "@/api/post.ts";
import LoadMore from "@/components/LoadMore.tsx";
import request from "@/lib/request.ts";
import useInfinite from "@/hooks/useInfinite.ts";
import { useNavigate } from "react-router-dom";

const getKey = (pageIndex: number, prevResp: PostListResponse) => {
  if (pageIndex === 0) return "/p/list?perPage=10";
  if (!prevResp.next) return null;
  return `/p/list?before=${prevResp.next}&perPage=10`;
};

const hasMore = (cur: PostListResponse) => {
  return !!cur.next;
};

const Posts = () => {
  const navigate = useNavigate();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [_query, _setQuery] = useState({
    perPage: 10,
  });

  const { data, loadData, status, mutate } = useInfinite({
    getKey,
    fetcher: (url) => request.get(url),
    hasMore,
  });
  return (
    <PageScaffold
      action={
        <IconButton
          bgColor={"transparent"}
          icon={<AddIcon />}
          aria-label={""}
          onClick={() => setShowCreatePost(true)}
        />
      }
      title={"帖子"}
    >
      <div className={"grid grid-cols-1 gap-5 p-3 md:grid-cols-3"}>
        <CreatePost
          open={showCreatePost}
          onSuccess={() => {
            void mutate();
          }}
          close={() => setShowCreatePost(false)}
        />
        {data
          ?.map((postPage) => postPage.items)
          .map((posts) =>
            posts.map((post) => (
              <div
                onClick={() => {
                  navigate(`/post/${post.id}`);
                }}
                className={
                  "flex cursor-pointer flex-col overflow-hidden rounded-md shadow-lg"
                }
                key={post.id}
              >
                <swiper-container
                  pagination={true}
                  style={{
                    width: "100%",
                    aspectRatio: 16 / 9,
                  }}
                  slidesPerView={1}
                  loop
                >
                  {post.mediaList.map((img) => (
                    <swiper-slide key={img.id}>
                      <Image
                        className={"h-full w-full object-cover"}
                        src={`${
                          import.meta.env.VITE_APP_BACKEND_BASE_URL
                        }/v/p/${img.path}`}
                        alt={""}
                      />
                    </swiper-slide>
                  ))}
                </swiper-container>
                <p className={"h-16 p-2"}>{post.description}</p>
              </div>
            ))
          )}
      </div>
      <LoadMore
        status={status}
        onScrollBottom={() => {
          loadData();
        }}
      />
    </PageScaffold>
  );
};

export default Posts;
