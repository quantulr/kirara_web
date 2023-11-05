import { ImageHistoryResponse } from "@/types/image-history-response.ts";
import FloatingUploadButton from "@/components/FloatingUploadButton.tsx";
import request from "@/lib/request.ts";
import useInfiniteLoad from "@/hooks/useInfiniteLoad.ts";
import ScrollToBottom from "@/components/ScrollToBottom.tsx";

const getKey = (pageIndex: number, previousPageData: ImageHistoryResponse) => {
  if (previousPageData && !previousPageData.hasNext) {
    return null;
  }
  return `/image/history?page=${pageIndex + 1}&perPage=10`;
};

const Gallery = () => {
  const { data, loadingState, loadMore, mutate } =
    useInfiniteLoad<ImageHistoryResponse>(getKey, (url) =>
      request.get<never, ImageHistoryResponse>(url).then((res) => res),
    );

  if (!data) return <div>loading</div>;
  return (
    <>
      {data?.[0].items.length > 0 ? (
        <div
          className={
            "relative !grid w-full grid-cols-3 content-start gap-0.5 md:grid-cols-6 lg:grid-cols-9"
          }
        >
          <FloatingUploadButton
            onSuccess={() => mutate()}
            className={
              "!fixed bottom-24 right-8 z-[9999999] !rounded-full md:bottom-8"
            }
          />
          {data.map((pageItem) =>
            pageItem.items.map((item) => (
              <div
                className={
                  "relative aspect-square cursor-pointer transition-transform"
                }
                key={item.id}
              >
                {/*<div*/}
                {/*  className={*/}
                {/*    "absolute left-0 top-0 z-[99999] h-full w-full backdrop-blur-md"*/}
                {/*  }*/}
                {/*></div>*/}
                <img
                  className={"h-full w-full object-cover"}
                  src={`${
                    import.meta.env.VITE_APP_BACKEND_BASE_URL
                  }/image/thumbnail/${item.filePath}`}
                  alt={""}
                />
              </div>
            )),
          )}
        </div>
      ) : (
        <div className={"flex h-full w-full items-center justify-center"}>
          <span className={"text-2xl text-gray-400"}>No images</span>
        </div>
      )}
      {data?.[0].items.length > 0 && (
        <ScrollToBottom onScrollBottom={loadMore} status={loadingState} />
      )}
    </>
  );
};

export default Gallery;
