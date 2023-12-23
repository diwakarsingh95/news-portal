import Hero from "../../components/Hero";
import LatestNews from "../../components/LatestNews";

const Home = () => {
  return (
    <div className="flex flex-col gap-5">
      <Hero />
      <LatestNews />
    </div>
  );
};

export default Home;
