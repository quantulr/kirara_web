import useSWR from "swr";
import request from "@/lib/request.ts";
import { ImageHistoryResponse } from "@/types/image-history-response.ts";

const Gallery = () => {
  const { data, isLoading, error } = useSWR(
    {
      url: "/image/history",
      params: {
        page: 1,
        perPage: 10,
      },
    },
    ({ url, params }) =>
      request.get<never, ImageHistoryResponse>(url, {
        params,
      })
  );
  if (error) return <div>error</div>;
  if (isLoading) return <div>loading</div>;
  return (
    <div
      className={
        "grid h-full w-full grid-cols-3 gap-1 md:grid-cols-6 lg:grid-cols-9"
      }
    >
      {data?.items.map((item) => (
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
