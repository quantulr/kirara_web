import { useParams } from "react-router-dom";
import useSWR from "swr";
import request from "@/lib/request.ts";
import { Post } from "@/api/post.ts";

import { Image } from "@chakra-ui/react";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
// import plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import PageScaffold from "@/components/PageScaffold.tsx";

const PostDetail = () => {
  const params = useParams();
  const { data } = useSWR(params.postId, (postId: string) =>
    request.get<never, Post>(`/p/${postId}`)
  );
  // useEffect(() => {
  //   let swiper: Swiper | null = new Swiper(".swiper-container", {});
  //   return () => {
  //     swiper?.destroy();
  //     swiper = null;
  //   };
  // }, []);

  return (
    <PageScaffold>
      <LightGallery
        elementClassNames={"swiper-container grid grid-cols-3 gap-3 p-3"}
        plugins={[lgThumbnail, lgZoom]}
      >
        {data?.mediaList.map((el) => (
          <a
            key={el.id}
            className={"aspect-square shadow-lg"}
            data-src={`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/v/s/${
              el.path
            }`}
          >
            <Image
              className={"h-full w-full object-cover"}
              src={`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/v/p/${
                el.path
              }`}
            />
          </a>
        ))}
        {/*</div>*/}
      </LightGallery>
    </PageScaffold>
  );
};

export default PostDetail;
