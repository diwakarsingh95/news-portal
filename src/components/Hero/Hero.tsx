import HotTopics from "../HotTopics";
import WeatherWidget from "../WeatherWidget";

const Hero = () => {
  return (
    <section>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-[508px] lg:w-[636px] xl:w-[800px] 2xl:w-[920px] order-2 md:order-1 flex flex-col gap-5">
          <HotTopics />
        </div>
        <div className="flex-grow order-1 md:order-2">
          <WeatherWidget />
        </div>
      </div>
    </section>
  );
};

export default Hero;
