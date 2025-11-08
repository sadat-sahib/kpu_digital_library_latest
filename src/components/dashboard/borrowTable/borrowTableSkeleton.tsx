import React from "react";
import { Skeleton } from "../../ui/skeleton";


const BorrowTableSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 space-y-5 animate-pulse">
      
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 px-3 py-3 rounded-lg shadow-sm">
        <Skeleton className="w-72 h-10 rounded-full" />
        <div className="flex gap-2">
          <Skeleton className="w-24 h-10 rounded-full" />
          <Skeleton className="w-24 h-10 rounded-full" />
        </div>
      </div>

      
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="grid grid-cols-6 bg-gray-100 dark:bg-gray-800 py-3 px-3 font-semibold text-gray-600 dark:text-gray-200 text-sm">
          <div className="text-center ">عنوان کتاب</div>
          <div className="text-center">نویسنده</div>
          <div className="text-center">نام کاربر</div>
          <div className="text-center">دیپارتمنت</div>
          <div className="text-center">تاریخ بازگشت</div>
          <div className="text-center">عملیات</div>
        </div>

        
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`grid grid-cols-6 items-center py-3 px-3 ${
              i % 2 === 0 ? "bg-gray-50 dark:bg-gray-900/40" : "bg-white dark:bg-gray-900"
            }`}
          >
            <div className="col-span-2 flex justify-center">
              <Skeleton className="w-48 h-4 rounded" />
            </div>
            <div className="flex justify-center">
              <Skeleton className="w-24 h-4 rounded" />
            </div>
            <div className="flex justify-center">
              <Skeleton className="w-28 h-4 rounded" />
            </div>
            <div className="flex justify-center">
              <Skeleton className="w-20 h-4 rounded" />
            </div>
            <div className="flex justify-center">
              <Skeleton className="w-24 h-4 rounded" />
            </div>
            <div className="flex justify-center gap-2">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="w-5 h-5 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      
      <div className="flex justify-between items-center pt-4">
        <Skeleton className="w-24 h-6 rounded-md" />
        <div className="flex gap-2">
          <Skeleton className="w-8 h-8 rounded-md" />
          <Skeleton className="w-8 h-8 rounded-md" />
          <Skeleton className="w-8 h-8 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default BorrowTableSkeleton;
