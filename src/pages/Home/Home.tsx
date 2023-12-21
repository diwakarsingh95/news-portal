import { useState } from "react";
import { useGetTopHeadlinesQuery } from "../../redux/api";

const PAGE_SIZE = 10;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useGetTopHeadlinesQuery({
    pageSize: PAGE_SIZE,
    page: currentPage
  });

  const offset = currentPage * 10;

  if (isLoading) return <p className="text-4xl text-center">Loading...</p>;
  if (error)
    return <p className="text-4xl text-center">{JSON.stringify(error)}</p>;

  if (!data || !data.articles.length)
    return <p className="text-4xl text-center">No Data</p>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>
      <button
        disabled={data?.totalResults < offset}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Home;
