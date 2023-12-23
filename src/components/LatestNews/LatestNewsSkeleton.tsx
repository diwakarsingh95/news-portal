const LatestNewsSkeleton = () => {
  // return Array(8)
  //   .fill(8)
  //   .map((_, index) => (
  //     <div key={index} className="h-full flex flex-col animate-pulse">
  //       <div className="flex-1 flex flex-col gap-4 ">
  //         <div className="w-full h-[100px] sm:h-[200px] bg-slate-400 rounded-lg"></div>
  //         <div className="h-4 bg-slate-600 rounded-lg"></div>
  //         <div className="h-4 mb-5 w-1/3 bg-slate-600 rounded-lg"></div>
  //       </div>
  //       <div className="mt-2 w-1/4 bg-slate-400 rounded-lg">
  //         <p className="h-3"></p>
  //       </div>
  //     </div>
  //   ));

  return (
    <div className="text-center mb-8">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-slate-700 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LatestNewsSkeleton;
