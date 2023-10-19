import { useParams } from "react-router-dom";
import useSWR from "swr";
import request from "@/lib/request.ts";
import { Post } from "@/api/post.ts";
import LightGallery from "lightgallery/react";
// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
// import plugins
import PageScaffold from "@/components/PageScaffold.tsx";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Image,
  Text,
} from "@chakra-ui/react";
import "swiper/css";

const PostDetail = () => {
  const params = useParams();
  const { data } = useSWR(params.postId, (postId: string) =>
    request.get<never, Post>(`/p/${postId}`)
  );

  return (
    <PageScaffold title={"帖子详情"}>
      <Card className={"m-3"}>
        <CardHeader>
          <Avatar />
        </CardHeader>
        <CardBody>
          <Text>{data?.description}</Text>
          <LightGallery
            elementClassNames={"mt-3 grid grid-cols-3 md:grid-cols-6 gap-1"}
            plugins={[lgThumbnail, lgZoom]}
          >
            {data?.mediaList.map((el) => (
              <a
                key={el.id}
                className={"aspect-square overflow-hidden rounded-lg shadow-lg"}
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
        </CardBody>
      </Card>
    </PageScaffold>
  );
};

export default PostDetail;
