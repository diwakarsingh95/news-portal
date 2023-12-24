import React, { useEffect, useState } from "react";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { NEWS_API_KEY } from "../../utils/constants";
import LatestNewsSkeleton from "./LatestNewsSkeleton";
import { useWindowResize } from "../../hooks/useWindowResize";
import { useGetLatestNewsQuery } from "../../redux/api";
import LatestNewsItem from "./LatestNewsItem";

const LatestNews = () => {
  const limit = 100;
  const {
    data,
    error,
    isLoading: loadingInitialData
  } = useGetLatestNewsQuery();
  const [items, setItems] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [noMoreContent, setNoMoreContent] = useState(false);
  const { width: windowWidth } = useWindowResize();

  const rowHeight =
    windowWidth >= 1280
      ? 380
      : windowWidth >= 1024
        ? 320
        : windowWidth >= 768
          ? 290
          : windowWidth >= 640
            ? 240
            : 220;
  const elementsInRow = windowWidth >= 1024 ? 4 : windowWidth >= 640 ? 3 : 2;

  const hasNextPage = !noMoreContent && totalResults > items.length;
  const offset = items.length % elementsInRow;
  const itemCount = hasNextPage
    ? Math.floor(items.length / elementsInRow) + 1
    : Math.floor(items.length / elementsInRow);
  const isItemLoaded = (index: number) =>
    !hasNextPage ||
    noMoreContent ||
    index * elementsInRow + offset < items.length;

  const fetchData = async (page: number) => {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=news&sortBy=publishedAtpageSize=${limit}&page=${page}&apiKey=${NEWS_API_KEY}`
      );
      const data = (await res.json()) as NewsResponse;
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const nextCallback = async () => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      const data = await fetchData(currentPage + 1);

      if (data && data.articles) {
        setItems((prevItems) => [...prevItems, ...data.articles]);
        setTotalResults(data.totalResults);
        setCurrentPage((state) => state + 1);
      } else {
        setNoMoreContent(true);
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setNoMoreContent(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setItems(data.articles);
      setTotalResults(data.totalResults);
      setCurrentPage(1);
    }
  }, [data]);

  if (error) return null;

  const RowItem = ({
    index,
    style
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const rowIndex = index * elementsInRow;
    const rowData = items.slice(rowIndex, rowIndex + elementsInRow);
    let content;
    if (!isItemLoaded(index)) {
      content = (
        <div style={style}>
          <LatestNewsSkeleton />
        </div>
      );
    } else {
      content = (
        <div
          style={style}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8"
        >
          {rowData &&
            !!rowData.length &&
            rowData.map((article, index) => (
              <LatestNewsItem
                key={`${article.title}_${rowIndex + index}`}
                article={article}
              />
            ))}
        </div>
      );
    }

    return content;
  };

  return (
    <section className="">
      <h2 className="text-3xl text-black font-bold mt-2 mb-6">Latest News</h2>
      {loadingInitialData && <LatestNewsSkeleton />}
      {items && !!items.length && (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={nextCallback}
          threshold={10}
        >
          {({ onItemsRendered, ref }) => (
            <FixedSizeList
              itemCount={itemCount}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width="100%"
              itemSize={rowHeight}
              height={rowHeight * 4}
            >
              {RowItem}
            </FixedSizeList>
          )}
        </InfiniteLoader>
      )}
    </section>
  );
};

export default LatestNews;
