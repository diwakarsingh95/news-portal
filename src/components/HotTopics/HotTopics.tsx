import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetTopHeadlinesQuery } from "../../redux/api";
import DefaultImage from "../../assets/hot-topic-deafult.webp";
import { relativeTimeToDate } from "../../utils/dayjs";
import HotTopicsSkeleton from "./HotTopicsSkeleton";

const PAGE_SIZE = 10;

const HotTopics = () => {
  const { data, isLoading } = useGetTopHeadlinesQuery({
    pageSize: PAGE_SIZE,
    page: 1
  });

  const sliderSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  const articlesData = data && data.articles;

  return (
    <>
      <h2 className="text-3xl text-black font-bold mt-0 md:mt-2">Hot Topics</h2>
      {isLoading ||
      !data ||
      !articlesData ||
      (articlesData && !articlesData.length) ? (
        <HotTopicsSkeleton />
      ) : (
        <Slider {...sliderSettings} fade lazyLoad="progressive">
          {articlesData.map((article, index) => (
            <div
              key={`${article.title}_${index}`}
              className="relative h-[200px] sm:h-[250px] md:h-[220px] lg:h-[276px] xl:h-[348px] 2xl:h-[400px]"
            >
              <img
                src={article.urlToImage || DefaultImage}
                alt={article.title}
                width={1600}
                height={900}
                loading={index !== 0 ? "lazy" : "eager"}
                className="w-full h-full rounded-lg mx-auto"
                onError={(event) => {
                  event.currentTarget.src = DefaultImage;
                }}
              />
              <div className="text-white absolute left-5 lg:left-10 bottom-5 lg:bottom-7 w-2/3 md:w-3/5 ">
                <a
                  className="font-bold line-clamp-2 lg:line-clamp-3 sm:text-xl lg:text-2xl leading-5 md:leading-normal"
                  href={article.url}
                >
                  {article.title}
                </a>
                <p className="text-xs leading-none md:text-sm mt-4 md:mt-3 opacity-90">
                  {relativeTimeToDate(article.publishedAt)}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
};

export default HotTopics;
