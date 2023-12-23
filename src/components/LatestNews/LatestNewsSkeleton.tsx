const LatestNewsSkeleton = () => {
  return (
    <div className="h-full flex flex-col animate-pulse">
      <div className="flex-1 flex flex-col gap-4 bg-slate-400">
        <div className="w-full h-[100px] sm:h-[200px] rounded-lg"></div>
        <div className="h-5 mb-5 bg-slate-600"></div>
        <div className="h-5 mb-5 bg-slate-600"></div>
      </div>
      <div className="mt-2">
        <p className="h-3"></p>
      </div>
    </div>
  );
};

export default LatestNewsSkeleton;
