import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";


const DetailsSkeleton = () => {
  return (
    <div className="mx-auto p-4 animate-pulse">
      {/* دکمه بازگشت */}
      <div className="mb-6 flex justify-end">
        <Skeleton className="h-10 w-40 rounded-xl" />
      </div>

      <Card className="flex flex-col lg:flex-row gap-8 p-6 border-none">
        {/* اسکلیتون تصویر کتاب */}
        <div className="lg:w-1/2 w-full flex justify-center items-start">
          <Skeleton className="w-full max-w-md h-96 rounded-md" />
        </div>

        {/* اسکلیتون جزئیات کتاب */}
        <CardContent className="lg:w-1/2 w-full space-y-6">
          <Skeleton className="h-10 w-3/4 rounded-md" />

          <div className="space-y-2">
            <Skeleton className="h-6 w-full rounded-md" />
            <Skeleton className="h-6 w-5/6 rounded-md" />
            <Skeleton className="h-6 w-2/3 rounded-md" />
            <Skeleton className="h-6 w-4/6 rounded-md" />
            <Skeleton className="h-6 w-3/4 rounded-md" />
            <Skeleton className="h-6 w-1/2 rounded-md" />
          </div>

          {/* اسکلیتون توضیحات */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/3 rounded-md" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>

          {/* اسکلیتون دکمه */}
          <Skeleton className="h-12 w-full lg:w-40 rounded-lg" />
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsSkeleton;
