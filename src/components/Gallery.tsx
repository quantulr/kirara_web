import { ImageHistoryResponseItem } from "@/types/image-history-response.ts";
import FloatingUploadButton from "@/components/FloatingUploadButton.tsx";
import { useRef } from "react";
import { useInfiniteScroll } from "ahooks";
import { getImageHistory } from "@/api/media.ts";

const Gallery = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { data } = useInfiniteScroll(
    (d) =>
      getImageHistory({
        page: d?.nextPage ?? 1,
        perPage: 10,
      }),
    {
      target: ref,
      isNoMore: (d) => d?.hasNext === false,
      onFinally: () => {
        console.log("finally");
      },
    }
  );
  // if (error) return <div>error</div>;
  // if (isLoading) return <div>loading</div>;
  return (
    <div
      ref={ref}
      className={
        "relative !grid h-full w-full grid-cols-3 content-start gap-1 overflow-y-scroll md:grid-cols-6 lg:grid-cols-9"
      }
      // options={{
      //   scrollbars: {
      //     autoHide: "leave",
      //     theme: "os-theme-dark",
      //     autoHideDelay: 100,
      //   },
      // }}
      // defer
    >
      <FloatingUploadButton
        className={"!fixed bottom-24 right-8 !rounded-full"}
      />
      {data?.list.map((item: ImageHistoryResponseItem) => (
        <div className={"aspect-square"} key={item.id}>
          <img
            className={"h-full w-full object-cover"}
            src={`${
              import.meta.env.VITE_APP_BACKEND_BASE_URL
            }/image/thumbnail/${item.filePath}`}
            alt={""}
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
