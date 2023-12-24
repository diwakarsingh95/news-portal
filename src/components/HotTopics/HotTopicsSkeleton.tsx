const HotTopicsSkeleton = () => {
  return (
    <div className="relative h-[200px] sm:h-[250px] md:h-[220px] lg:h-[276px] xl:h-[348px] 2xl:h-[400px] animate-pulse flex space-x-4">
      <div className="h-full w-full rounded-lg mx-auto bg-slate-400">
        <p className="sr-only">Loading...</p>
      </div>
    </div>
  );
};

export default HotTopicsSkeleton;
