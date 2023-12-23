import React, { useCallback, useEffect, useState } from "react";

type InfiniteScrollProps = {
  offset?: number;
  totalResults: number;
  limit: number;
  contentHeight: number;
  isLoading: boolean;
  onNextCallback: () => Promise<boolean>;
  children: React.ReactNode;
};

const InfiniteScroll = ({
  offset = 0,
  totalResults,
  limit,
  contentHeight,
  isLoading,
  onNextCallback,
  children
}: InfiniteScrollProps) => {
  const [fetchedResults, setFetchedResults] = useState(offset);
  const [currentScrollHeightThreshold, setCurrentScrollHeightThreshold] =
    useState(0);

  const handleScroll = useCallback(() => {
    if (isLoading) {
      return;
    }

    const target = document.documentElement;
    const scrollTop = Math.round(target.scrollTop);
    const clientHeight = Math.round(target.clientHeight);
    const scrollHeight = Math.round(target.scrollHeight);
    const scrollThreshold = scrollHeight - contentHeight / 2;

    if (
      totalResults > fetchedResults &&
      scrollTop + clientHeight >= scrollThreshold &&
      scrollThreshold > 0 &&
      scrollThreshold !== currentScrollHeightThreshold
    ) {
      setCurrentScrollHeightThreshold(scrollThreshold);
      onNextCallback()
        .then((success) => {
          if (success) {
            setFetchedResults((prevState) => prevState + limit);
          }
        })
        .catch(() => {});
    }
  }, [
    currentScrollHeightThreshold,
    contentHeight,
    fetchedResults,
    isLoading,
    limit,
    onNextCallback,
    totalResults
  ]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return children;
};

export default InfiniteScroll;
