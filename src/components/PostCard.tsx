import { Post } from "@/api/post.ts";
import useSwiper from "@/hooks/useSwiper.ts";
import { HashLoader } from "react-spinners";
import { Image } from "@chakra-ui/react";
import { useRef } from "react";

const PostCard = ({ post, onClick }: { post: Post; onClick?: () => void }) => {
  const swiperRef = useRef<HTMLDivElement>(null);
  useSwiper(swiperRef, {
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    effect: "coverflow",
    slidesPerView: 1,
  });
  return (
    <div
      onClick={onClick}
      className={
        "flex cursor-pointer flex-col overflow-hidden rounded-md shadow-lg"
      }
    >
      <div ref={swiperRef} className={"swiper aspect-video w-full"}>
        <div className={"swiper-wrapper"}>
          {post.mediaList.map((media) => (
            <div
              key={media.id}
              className={"swiper-slide flex items-center justify-center"}
            >
              <Image
                className={"h-full w-full object-cover"}
                src={`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/v/p/${
                  media.path
                }`}
                alt={""}
                fallback={<HashLoader size={24} />}
              />
            </div>
          ))}
        </div>
        <div className={"swiper-pagination"}></div>
      </div>
      <p className={"h-16 p-2"}>{post.description}</p>
    </div>
  );
};

export default PostCard;
