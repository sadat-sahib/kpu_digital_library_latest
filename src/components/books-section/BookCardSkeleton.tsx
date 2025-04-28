import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

function SingleBookCardSkeleton() {
  return (
    <Card className="book-card shadow-lg mx-auto w-[90%] sm:w-[150px] md:w-[180px] lg:w-[250px] flex-shrink-0">
      <div className="relative h-48 w-full overflow-hidden rounded-t-md">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent>
        <div className="flex justify-center items-center py-2">
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-3 w-1/2 mx-auto" />
        </div>
        <Skeleton className="w-full h-8 mt-4" />
      </CardContent>
    </Card>
  );
}

export default function BookCardSkeleton() {
  return (
    <div className="flex gap-4 flex-wrap justify-center py-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <SingleBookCardSkeleton key={index} />
      ))}
    </div>
  );
}
