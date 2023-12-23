import { useEffect, useState } from "react";
import DefaultImage from "../../assets/hot-topic-deafult.webp";
import { relativeTimeToDate } from "../../utils/dayjs";
import InfiniteScroll from "../InfiniteScroll";
import { NEWS_API_KEY } from "../../utils/constants";
import LatestNewsSkeleton from "./LatestNewsSkeleton";
import { useWindowResize } from "../../hooks/useWindowResize";

const LatestNews = () => {
  const limit = 100;
  const [items, setItems] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const { width: windowWidth } = useWindowResize();

  const rowHeight =
    windowWidth >= 1280
      ? 350
      : windowWidth >= 1024
        ? 300
        : windowWidth >= 640
          ? 265
          : 220;
  const elementsInRow = windowWidth >= 1024 ? 4 : windowWidth >= 640 ? 3 : 2;
  const contentHeight = (rowHeight * limit) / elementsInRow;

  const fetchData = async (page: number) => {
    try {
      console.log("fetchData", page);
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

  useEffect(() => {
    setIsLoading(true);
    fetchData(1)
      .then((res) => {
        setItems(res ? res.articles : []);
        setIsLoading(false);
        setTotalResults(res ? res.totalResults : 0);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const nextCallback = async () => {
    try {
      setIsLoading(true);
      const data = await fetchData(currentPage + 1);

      if (data && data.articles) {
        setItems((prevItems) => [...prevItems, ...data.articles]);
        setTotalResults(data.totalResults);
        setCurrentPage((state) => state + 1);
        setIsLoading(false);
        return true;
      }
      setIsLoading(false);
      return false;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return false;
    }
  };

  return (
    <section className="">
      <h2 className="text-3xl text-black font-bold mb-5">Latest News</h2>
      <InfiniteScroll
        isLoading={isLoading}
        totalResults={totalResults}
        limit={limit}
        onNextCallback={nextCallback}
        contentHeight={contentHeight}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 mt-5">
          {items && !!items.length ? (
            items.map((article, index) => (
              <div
                key={`${article.title}_${index}`}
                className="h-full flex flex-col"
              >
                <div className="flex-1 flex flex-col gap-4">
                  <a
                    href={article.url}
                    className="block"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={article.urlToImage || DefaultImage}
                      alt={article.title}
                      width={1600}
                      height={900}
                      loading="lazy"
                      className="w-full h-[100px] md:h-[130px] lg:h-[150px] xl:h-[200px] rounded-lg"
                      onError={(event) => {
                        event.currentTarget.src = DefaultImage;
                      }}
                    />
                  </a>
                  <a
                    className="font-bold line-clamp-3 text md:text-[18px] lg:text-xl leading-tight hover:opacity-70 mb-5"
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {article.title}
                  </a>
                </div>
                <div className="mt-2">
                  <p className="text-xs leading-none md:text-sm opacity-90">
                    {relativeTimeToDate(article.publishedAt)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <LatestNewsSkeleton />
          )}
          {isLoading && <LatestNewsSkeleton />}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default LatestNews;
