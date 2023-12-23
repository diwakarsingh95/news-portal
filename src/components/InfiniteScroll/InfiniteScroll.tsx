import React, { useRef, useState } from "react";
import debounce from "lodash.debounce";
import LatestNewsSkeleton from "../LatestNews/LatestNewsSkeleton";

type InfiniteScrollProps = {
  offset?: number;
  currentPage: number;
  totalResults: number;
  buffer: number;
  limit: number;
  rowHeight: number;
  isLoading: boolean;
  onPrevCallback: () => Promise<boolean>;
  onNextCallback: () => Promise<boolean>;
  children: React.ReactNode;
};

const InfiniteScroll = ({
  offset = 0,
  totalResults,
  currentPage,
  buffer,
  limit,
  rowHeight,
  isLoading,
  onPrevCallback,
  onNextCallback,
  children
}: InfiniteScrollProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [upperBoundary, setUpperBoundary] = useState(offset);
  const [lowerBoundary, setLowerBoundary] = useState(buffer - 1);
  const [currentScrollTopPosition, setCurrentScrollTopPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (isLoading) {
      return;
    }

    const { target: tgt } = e;
    const target = tgt as HTMLElement;
    const scrollTop = Math.round(target.scrollTop);
    const clientHeight = Math.round(target.clientHeight);
    const scrollHeight = Math.round(target.scrollHeight);

    const isUp = scrollTop < currentScrollTopPosition;

    if (isUp && currentPage > 1 && scrollTop < 500) {
      setScrollDirection("up");
      onPrevCallback()
        .then(() => {
          setUpperBoundary(upperBoundary - limit);
          setLowerBoundary(lowerBoundary - limit);

          if (overlayRef !== null) {
            const scrollPos = limit * rowHeight;
            overlayRef.current?.scrollTo(0, scrollPos);
          }
        })
        .catch(() => {});
    } else if (
      !isUp &&
      totalResults > upperBoundary &&
      scrollTop + clientHeight >= scrollHeight - 500
    ) {
      setScrollDirection("down");
      onNextCallback()
        .then(() => {
          setUpperBoundary(upperBoundary + limit);
          setLowerBoundary(lowerBoundary + limit);

          if (overlayRef !== null) {
            const scrollPos = limit * rowHeight;
            overlayRef.current?.scrollTo(0, scrollPos * 2);
          }
        })
        .catch(() => {});
    }
    setCurrentScrollTopPosition(scrollTop);
  };

  const handleScrollDebounced = debounce(handleScroll, 100);

  return (
    <div
      ref={overlayRef}
      className="w-full h-screen overflow-y-scroll no-scrollbar"
      onScroll={handleScrollDebounced}
    >
      {isLoading && scrollDirection === "up" && <LatestNewsSkeleton />}
      {children}
      {isLoading && scrollDirection === "down" && <LatestNewsSkeleton />}
    </div>
  );
};

export default InfiniteScroll;
