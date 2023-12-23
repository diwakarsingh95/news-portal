const HotTopicsSkeleton = () => {
  return (
    <div className="relative h-[200px] sm:h-[300px] xl:h-[400px] animate-pulse flex space-x-4">
      <div className="h-full w-full rounded-lg bg-slate-400">
        <p className="sr-only">Loading...</p>
      </div>
    </div>
  );
};

export default HotTopicsSkeleton;
