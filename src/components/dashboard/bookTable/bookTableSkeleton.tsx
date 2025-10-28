import React from "react";
import { Skeleton } from "../../ui/skeleton";

const BooksTableSkeleton = () => {
  // Simulated loading rows
  const rows = Array.from({ length: 8 });

  // Column width proportions (match DataTable)
  const columns = [
    "w-[90px]",   // آی‌دی
    "w-[200px]",  // عنوان کتاب
    "w-[180px]",  // نویسنده
    "w-[160px]",  // ناشر
    "w-[120px]",  // سال نشر
    "w-[180px]",  // عملیات
  ];

  return (
    <div className="bg-white rounded-lg shadow-md w-full">


      {/* Table container */}
      <div className="border border-gray-200 overflow-hidden w-full">
    

        {/* Table body */}
        <div className="divide-y divide-gray-200">
          {rows.map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-6 items-center text-center px-4 py-3 hover:bg-blue-50 transition-colors"
            >
              {/* آی‌دی */}
              <div className="mx-auto w-[90px]">
                <Skeleton className="h-4 w-10 rounded-md" />
              </div>
              {/* عنوان کتاب */}
              <div className="mx-auto w-[200px]">
                <Skeleton className="h-4 w-36 rounded-md" />
              </div>
              {/* نویسنده */}
              <div className="mx-auto w-[180px]">
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
              {/* ناشر */}
              <div className="mx-auto w-[160px]">
                <Skeleton className="h-4 w-28 rounded-md" />
              </div>
              {/* سال نشر */}
              <div className="mx-auto w-[120px]">
                <Skeleton className="h-4 w-16 rounded-md" />
              </div>
              {/* عملیات */}
              <div className="flex items-center justify-center gap-3 w-[180px] mx-auto">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksTableSkeleton;
