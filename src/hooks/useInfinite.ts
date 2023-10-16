import useSWRInfinite, {
  SWRInfiniteConfiguration,
  SWRInfiniteKeyLoader,
} from "swr/infinite";
import { useCallback, useMemo } from "react";
import { LoadingStatus } from "@/types/loadingStatus.ts";
import { last } from "lodash-es";

const useInfinite = <T>({
  getKey,
  fetcher,
  options,
  hasMore,
}: {
  getKey: SWRInfiniteKeyLoader;
  fetcher: (url: string) => Promise<T>;
  options?: SWRInfiniteConfiguration;
  hasMore: (cur: T) => boolean;
}) => {
  const { data, error, isLoading, isValidating, mutate, setSize } =
    useSWRInfinite<T>(getKey, fetcher, options);
  // 加载状态
  const status = useMemo(() => {
    if (isLoading || isValidating) return LoadingStatus.loading;
    if (error) return LoadingStatus.failed;
    if (data && data.length) {
      const lastResp = last(data);
      if (!lastResp) return LoadingStatus.complete;
      const complete = !hasMore(lastResp);
      if (complete) return LoadingStatus.complete;
    }
    // return LoadingStatus.loading;
  }, [data, error, isLoading, isValidating]);

  // 加载更多
  const loadData = useCallback(() => {
    // 如果正在加载，不继续加载
    if (isLoading || isValidating) return;

    // 如果没有下一页，不继续加载
    if (data && data.length) {
      const lastResp = last(data);
      if (!lastResp) return;
      const complete = !hasMore(lastResp);
      if (complete) return;
    }
    setSize((size) => size + 1);
  }, [data, isLoading]);
  return { data, status, loadData, mutate };
};

export default useInfinite;
