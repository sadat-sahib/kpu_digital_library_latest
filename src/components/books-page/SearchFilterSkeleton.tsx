import React from "react";
import { Skeleton } from "../ui/skeleton";


export default function BooksPageSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 bg-gray-50 rounded-lg shadow-lg">
      {/* Search Bar & Filters Skeleton */}
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex gap-4 items-center w-full md:w-1/2">
          <Skeleton className="h-10 w-48 rounded-lg" />
          <Skeleton className="h-10 w-full md:w-1/2 rounded-lg" />
        </div>

        <div className="w-full md:w-1/3">
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>

      {/* Book Cards Skeleton */}
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="book-card shadow-lg mx-auto w-[90%] sm:w-[150px] md:w-[180px] lg:w-[250px] flex-shrink-0 flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden rounded-t-md">
                <Skeleton className="h-full w-full" />
              </div>

              <div className="p-4 flex flex-col gap-3">
                <div className="flex justify-center">
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>
                <div className="space-y-2 text-center">
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                  <Skeleton className="h-3 w-1/2 mx-auto" />
                </div>
                <Skeleton className="w-full h-8 mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
