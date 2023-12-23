const LatestNewsSkeleton = () => {
  return Array(8)
    .fill(8)
    .map((_, index) => (
      <div key={index} className="h-full flex flex-col animate-pulse">
        <div className="flex-1 flex flex-col gap-4 ">
          <div className="w-full h-[100px] sm:h-[200px] bg-slate-400 rounded-lg"></div>
          <div className="flex flex-col gap-3 mb-5">
            <div className="h-4 bg-slate-600 rounded-lg"></div>
            <div className="h-4 w-1/3 bg-slate-600 rounded-lg"></div>
          </div>
        </div>
        <div className="mt-5 w-1/4 bg-slate-300 rounded-lg">
          <p className="h-3"></p>
        </div>
      </div>
    ));
};

export default LatestNewsSkeleton;
