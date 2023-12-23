import dayjs from "dayjs";
import HotTopics from "../HotTopics";

const Hero = () => {
  return (
    <section>
      <div className="flex flex-col md:flex-row gap-3 my-5">
        <div className="w-full md:w-3/4 lg:w-4/5 order-2 md:order-1 flex flex-col gap-5">
          <HotTopics />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="hidden md:block">{dayjs().format("dddd DD MMM YY")}</h2>
          <h3>Weather</h3>
        </div>
      </div>
    </section>
  );
};

export default Hero;
