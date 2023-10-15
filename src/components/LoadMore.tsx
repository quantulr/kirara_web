import { HashLoader } from "react-spinners";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { LoadingStatus } from "@/types/loadingStatus.ts";

const LoadMore = ({
  onScrollBottom,
  status,
}: {
  onScrollBottom?: () => void;
  status: LoadingStatus | undefined;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  useEffect(() => {
    console.log(status);
    if (isInView) {
      onScrollBottom?.();
    }
  }, [isInView]);
  return (
    <>
      <div ref={ref} className={"mb-2 flex h-6 items-center justify-center"}>
        {status === LoadingStatus.loading ? (
          <HashLoader size={20} color={"#4B5563"} />
        ) : status === LoadingStatus.complete ? (
          <div className={"text-sm text-gray-500"}>没有更多</div>
        ) : (
          <div className={"text-sm text-gray-500"}>加载更多</div>
        )}
      </div>
    </>
  );
};

export default LoadMore;
