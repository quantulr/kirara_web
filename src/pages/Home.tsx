import CreatePost from "@/components/CreatePost.tsx";
import PageScaffold from "@/components/PageScaffold.tsx";
import { AddIcon } from "@chakra-ui/icons";
import { IconButton, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { usePosts } from "@/api/post.ts";

const Home = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [query, _setQuery] = useState({
    perPage: 10,
  });
  const { posts, isLoading, isError } = usePosts(query);
  if (isLoading) return <Spinner />;
  if (isError) return <Spinner />;

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
          close={() => setShowCreatePost(false)}
        />
        {posts?.items.map((el) => (
          <div
            className={"flex aspect-[4/3] flex-col rounded-md shadow-md"}
            key={el.id}
          >
            <img
              className={"h-full w-full object-cover"}
              src={`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/v/s/${
                el.mediaList[0].path
              }`}
            />
            <p className={"h-10 p-2"}>{el.description}</p>
          </div>
        ))}
      </div>
    </PageScaffold>
  );
};

export default Home;
