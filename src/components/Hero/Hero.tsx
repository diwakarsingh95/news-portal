import HotTopics from "../HotTopics";
import WeatherWidget from "../WeatherWidget";

const Hero = () => {
  return (
    <section>
      <div className="flex flex-col md:flex-row gap-3 my-5">
        <div className="w-full md:w-3/4 lg:w-4/5 order-2 md:order-1 flex flex-col gap-5">
          <HotTopics />
        </div>
        <div className="order-1 md:order-2">
          <WeatherWidget />
        </div>
      </div>
    </section>
  );
};

export default Hero;
