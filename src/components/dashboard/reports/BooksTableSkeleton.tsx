import React from "react";
import { Skeleton } from "../../ui/skeleton";

const BooksTableSkeleton = () => {
  // Define number of rows to simulate loading
  const rows = Array.from({ length: 8 });

  return (
    <div className="w-full overflow-x-auto rounded-md border border-gray-200">
      {/* Table Header */}
      <div className="grid grid-cols-5 bg-gray-50 dark:bg-gray-800 text-sm font-semibold py-3 px-4 text-center">
        <div>عنوان</div>
        <div>نویسنده</div>
        <div>کتگوری</div>
        <div>وضعیت</div>
        <div>دیپارتمنت</div>
      </div>

      {/* Table Body Skeleton Rows */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {rows.map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 items-center py-3 px-4 text-center"
          >
            <Skeleton className="h-5 mx-auto w-24" />
            <Skeleton className="h-5 mx-auto w-20" />
            <Skeleton className="h-5 mx-auto w-20" />
            <Skeleton className="h-6 mx-auto w-16 rounded-full" />
            <Skeleton className="h-5 mx-auto w-24" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksTableSkeleton;
