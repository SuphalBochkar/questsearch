import React from "react";

const SkeletonQuestionItem = () => {
  return (
    <div className="p-4 border rounded-lg mb-4 animate-pulse">
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

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
          <SkeletonQuestionItem key={i} />
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
