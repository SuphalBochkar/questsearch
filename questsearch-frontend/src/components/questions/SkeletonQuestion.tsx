import React from "react";

const SkeletonQuestion = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-8 w-12 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Questions list skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonQuestion key={i} />
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="mt-8 flex justify-between items-center">
        <div className="h-5 w-64 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 w-10 bg-gray-200 rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonQuestion;
