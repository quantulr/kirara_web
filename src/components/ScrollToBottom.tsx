import { memo, useEffect, useRef } from "react";
import { ScaleLoader } from "react-spinners";
import { useInView } from "framer-motion";
// import { useInView } from "framer-motion";

const ScrollToBottom = memo(
  ({
    onScrollBottom,
    status,
  }: {
    onScrollBottom: () => void;
    status: "loading" | "empty" | "complete" | undefined;
  }) => {
    const ref = useRef(null);

    const isInView = useInView(ref);
    useEffect(() => {
      if (isInView) {
        onScrollBottom?.();
      }
    }, [isInView, onScrollBottom]);
    return (
      <>
        <div
          ref={ref}
          className={"status-indicator flex items-center justify-center"}
        >
          {status === "loading" ? (
            <ScaleLoader
              className={""}
              height={12}
              width={3}
              color={"#4B5563"}
            />
          ) : status === "complete" ? (
            <div className={"text-sm text-gray-500"}>没有更多</div>
          ) : (
            <div className={"text-sm text-gray-500"}>加载更多</div>
          )}
        </div>
      </>
    );
  },
);

export default ScrollToBottom;
