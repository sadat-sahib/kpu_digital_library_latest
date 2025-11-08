import React from "react";
import { Skeleton } from "../ui/skeleton";


function CategoryAmountsCartSkeleton() {
    return (
      <div className="py-10 px-4">
        {/* Skeleton Title */}
        <Skeleton className="w-48 h-6 bg-gray-200 rounded mx-auto mb-8 animate-pulse"></Skeleton>
  
        {/* Skeleton Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className="w-full h-16 rounded-full bg-gray-200 animate-pulse flex items-center justify-center"
            >
              <Skeleton className="w-20 h-4 bg-gray-300 rounded"></Skeleton>
            </Skeleton>
          ))}
        </div>
      </div>
    );
  }
  export default CategoryAmountsCartSkeleton;