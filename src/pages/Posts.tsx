import CreatePost from "@/components/CreatePost.tsx";
import PageScaffold from "@/components/PageScaffold.tsx";
import { AddIcon } from "@chakra-ui/icons";
import { IconButton, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { usePosts } from "@/api/post.ts";

const Posts = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [query, _setQuery] = useState({
    perPage: 10,
  });
  const { posts, isLoading, isError, mutate } = usePosts(query);

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
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <Spinner />
        ) : (
          posts?.items.map((el) => (
            <div
              className={"flex flex-col overflow-hidden rounded-md shadow-lg"}
              key={el.id}
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
                {el.mediaList.map((img) => (
                  <swiper-slide key={img.id}>
                    <img
                      className={"h-full w-full object-cover"}
                      src={`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/v/p/${
                        img.path
                      }`}
                      alt={""}
                    />
                  </swiper-slide>
                ))}
              </swiper-container>
              <p className={"h-16 p-2"}>{el.description}</p>
            </div>
          ))
        )}
      </div>
    </PageScaffold>
  );
};

export default Posts;
