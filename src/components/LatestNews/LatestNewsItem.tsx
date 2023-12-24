import React from "react";
import DefaultImage from "../../assets/hot-topic-deafult.webp";
import { relativeTimeToDate } from "../../utils/dayjs";

const LatestNewsItem = React.memo(function LatestNewsItem({
  article
}: {
  article: NewsArticle;
}) {
  return (
    <div className="h-full flex flex-col pb-6 md:pb-8">
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
          className="font-bold line-clamp-2 sm:line-clamp-3 text md:text-[18px] lg:text-xl leading-tight hover:opacity-70"
          href={article.url}
          target="_blank"
          rel="noreferrer"
        >
          {article.title}
        </a>
      </div>
      <div className="mt-1">
        <p className="text-xs leading-none md:text-sm opacity-90">
          {relativeTimeToDate(article.publishedAt)}
        </p>
      </div>
    </div>
  );
});

export default LatestNewsItem;
