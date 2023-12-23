import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetTopHeadlinesQuery } from "../../redux/api";
import DefaultImage from "../../assets/hot-topic-deafult.webp";
import { relativeTimeToDate } from "../../utils/dayjs";

const PAGE_SIZE = 10;

const HotTopics = () => {
  const { data, isLoading, error } = useGetTopHeadlinesQuery({
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

  if (isLoading) return <p className="text-4xl text-center">Loading...</p>;
  if (error)
    return <p className="text-4xl text-center">{JSON.stringify(error)}</p>;

  if (!data || !data.articles.length)
    return <p className="text-4xl text-center">No Data</p>;

  const articlesData = data.articles;

  return (
    <>
      <h2 className="text-3xl text-black font-bold">Hot Topics</h2>
      <Slider {...sliderSettings} fade>
        {articlesData.map((article, index) => (
          <div
            key={`${article.title}_${index}`}
            className="relative h-[200px] sm:h-[300px] xl:h-[400px]"
          >
            <img
              src={article.urlToImage || DefaultImage}
              alt={article.title}
              width={1600}
              height={900}
              loading="lazy"
              className="h-full w-full rounded-lg"
            />
            <div className="text-white absolute left-4 md:left-10 bottom-5 md:bottom-7 w-2/3 md:w-3/5 ">
              <a
                className="font-bold line-clamp-2 md:line-clamp-3 md:text-xl lg:text-3xl leading-5 md:leading-normal"
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
    </>
  );
};

export default HotTopics;
