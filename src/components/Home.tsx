import CreatePost from "@/components/CreatePost.tsx";
import PageScaffold from "@/components/PageScaffold.tsx";
import { AddIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useState } from "react";

const Home = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
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
    >
      <div className={"grid grid-cols-3 gap-1 md:grid-cols-6 xl:grid-cols-9"}>
        <CreatePost
          open={showCreatePost}
          close={() => setShowCreatePost(false)}
        />
      </div>
    </PageScaffold>
  );
};

export default Home;
