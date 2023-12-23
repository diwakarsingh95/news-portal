import { useEffect, useState } from "react";
import DefaultImage from "../../assets/hot-topic-deafult.webp";
import { relativeTimeToDate } from "../../utils/dayjs";
import InfiniteScroll from "../InfiniteScroll";

const LatestNews = () => {
  const limit = 100;
  const buffer = limit * 3;
  const cache = buffer - limit;
  const [items, setItems] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchData = async (page: number) => {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=news&sortBy=publishedAtpageSize=${limit}&page=${page}&apiKey=d6dfca3ae03f4bafac99e4fb3dc56354`
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
      .catch(() => {});
  }, []);

  const prevCallback = async () => {
    try {
      const data = await fetchData(currentPage - 1);

      if (data) {
        const newItems = [...data.articles, ...items.slice(0, cache)];
        setItems(newItems);
        setTotalResults(data.totalResults);
        setCurrentPage((state) => state - 1);
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const nextCallback = async () => {
    try {
      const data = await fetchData(currentPage + 1);

      if (data) {
        const newItems = [...data.articles, ...items.slice(0, cache)];
        setItems(newItems);
        setTotalResults(data.totalResults);
        setCurrentPage((state) => state + 1);
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <section className="">
      <h2 className="text-3xl text-black font-bold mb-5">Latest News</h2>
      <InfiniteScroll
        currentPage={currentPage}
        isLoading={isLoading}
        totalResults={totalResults}
        buffer={buffer}
        rowHeight={39}
        limit={limit}
        onPrevCallback={prevCallback}
        onNextCallback={nextCallback}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 mt-5">
          {items &&
            items.length &&
            items.map((article, index) => (
              <div
                key={`${article.title}_${index}`}
                className="h-full flex flex-col"
              >
                <div className="flex-1 flex flex-col gap-4">
                  <a href={article.url} className="block">
                    <img
                      src={article.urlToImage || DefaultImage}
                      alt={article.title}
                      width={1600}
                      height={900}
                      loading="lazy"
                      className="w-full h-[100px] sm:h-[200px] rounded-lg"
                      onError={(event) => {
                        event.currentTarget.src = DefaultImage;
                      }}
                    />
                  </a>
                  <a
                    className="font-bold line-clamp-3 text sm:text-xl leading-tight hover:opacity-70 mb-5"
                    href={article.url}
                  >
                    {article.title}
                  </a>
                </div>
                <div className="mt-2">
                  <p className="text-xs leading-none sm:text-sm opacity-90">
                    {relativeTimeToDate(article.publishedAt)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default LatestNews;
