import React from "react";
import { Skeleton } from "../../ui/skeleton";
const UserTableSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 w-full px-2">
        <Skeleton className="w-full md:w-64 h-10 rounded-md" />
        <Skeleton className="w-full md:w-48 h-10 rounded-md" />
        <div className="flex gap-2">
          <Skeleton className="w-20 h-10 rounded-md" />
          <Skeleton className="w-20 h-10 rounded-md" />
        </div>
      </div>

      <div className="border border-gray-200 rounded-md overflow-hidden">
        <div className="grid grid-cols-6 bg-gray-100 py-3 px-2 font-semibold text-gray-600 text-sm">
          <div className="text-center">آی‌دی</div>
          <div className="text-center">نام</div>
          <div className="text-center">تخلص</div>
          <div className="text-center col-span-2">ایمیل</div>
          <div className="text-center">عملیات</div>
        </div>

        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className={`grid grid-cols-6 items-center py-3 px-2 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <div className="flex justify-center">
              <Skeleton className="w-8 h-4 rounded" />
            </div>
            <div className="flex justify-center">
              <Skeleton className="w-20 h-4 rounded" />
            </div>
            <div className="flex justify-center">
              <Skeleton className="w-20 h-4 rounded" />
            </div>
            <div className="flex justify-center col-span-2">
              <Skeleton className="w-48 h-4 rounded" />
            </div>
            <div className="flex justify-center gap-2">
              <Skeleton className="w-5 h-5 rounded-full" />
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

export default UserTableSkeleton;
