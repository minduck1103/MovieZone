import React from "react";

const GenreGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-800 animate-pulse"
        >
          {/* Background placeholder */}
          <div className="h-full w-full bg-gradient-to-br from-gray-700 to-gray-800" />
          
          {/* Content placeholder */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="space-y-2">
              {/* Title skeleton */}
              <div className="h-6 bg-gray-600 rounded w-3/4 animate-pulse" />
              
              {/* Subtitle skeleton */}
              <div className="flex items-center space-x-2">
                <div className="h-1 w-8 bg-gray-600 rounded-full animate-pulse" />
                <div className="h-4 bg-gray-600 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Decorative skeleton */}
          <div className="absolute top-4 right-4">
            <div className="h-2 w-2 bg-gray-600 rounded-full animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GenreGridSkeleton;
