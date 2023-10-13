import { HashLoader } from "react-spinners";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const LoadMore = ({
  onScrollBottom,
  status,
}: {
  onScrollBottom?: () => void;
  status: "loading" | "empty" | "complete" | undefined;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  useEffect(() => {
    console.log("render");
    if (isInView) {
      onScrollBottom?.();
    }
  }, [isInView, onScrollBottom]);
  return (
    <>
      <div ref={ref} className={"mb-2 flex h-6 items-center justify-center"}>
        {status === "loading" ? (
          <HashLoader size={20} color={"#4B5563"} />
        ) : status === "complete" ? (
          <div className={"text-sm text-gray-500"}>没有更多</div>
        ) : (
          <div className={"text-sm text-gray-500"}>加载更多</div>
        )}
      </div>
    </>
  );
};

export default LoadMore;
