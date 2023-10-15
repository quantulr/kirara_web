import useSWRInfinite, {
  SWRInfiniteConfiguration,
  SWRInfiniteKeyLoader,
} from "swr/infinite";
import { useCallback, useMemo } from "react";
import { KeyedMutator } from "swr";

const useInfiniteLoad = <T>(
  getKey: SWRInfiniteKeyLoader,
  fetcher: (key: string) => Promise<T>,
  swrOptions?: SWRInfiniteConfiguration
): {
  data: T[] | undefined;
  loadingState: "loading" | "empty" | "complete" | undefined;
  loadMore: () => void;
  mutate: KeyedMutator<T[]>;
} => {
  const { data, setSize, isLoading, size, mutate } = useSWRInfinite(
    getKey,
    fetcher,
    swrOptions
  );

  const loadMore = useCallback(() => {
    if (!data) {
      return;
    }
    if (typeof data[size - 1] === "undefined") {
      return;
    }
    if (!data?.[data.length - 1].hasNext) {
      return;
    }
    void setSize((size) => size + 1);
  }, [data, setSize, size]);

  const loadingState = useMemo(() => {
    const isLoadingMore =
      isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

    if (isLoadingMore) {
      return "loading";
    }
    const isEmpty = data?.[0].items.length === 0;
    if (isEmpty) {
      return "empty";
    }
    const isComplete = data?.[data.length - 1]?.hasNext === false;
    if (isComplete) {
      return "complete";
    }
  }, [data, isLoading, size]);

  return {
    data,
    loadingState,
    loadMore,
    mutate,
  };
};

export default useInfiniteLoad;
