import dayjs from "dayjs";
import { useGetCurrentWeatherDataQuery } from "../../redux/api";

const WeatherWidget = () => {
  const { data } = useGetCurrentWeatherDataQuery();

  console.log(data);

  return (
    <div className="flex flex-col gap-2 text-center">
      <h2 className="hidden md:block text-sky-600 lg:text-xl xl:text-2xl 2xl:text-[28px] font-bold p-2">
        {dayjs().format("dddd DD MMM YY'")}
      </h2>
      <div className="text-center p-2">
        <h3>Weather Widget</h3>
      </div>
    </div>
  );
};

export default WeatherWidget;
