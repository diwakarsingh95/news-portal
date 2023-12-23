import dayjs from "dayjs";
import { useGetCurrentWeatherDataQuery } from "../../redux/api";

const WeatherWidget = () => {
  const { data } = useGetCurrentWeatherDataQuery();

  console.log(data);

  return (
    <div>
      <h2 className="hidden md:block text-sky-600 lg:text-xl font-bold leading-tight">
        {dayjs().format("dddd DD MMM YY'")}
      </h2>
      <div className="mt-5">
        <h3>Weather Widget</h3>
      </div>
    </div>
  );
};

export default WeatherWidget;
