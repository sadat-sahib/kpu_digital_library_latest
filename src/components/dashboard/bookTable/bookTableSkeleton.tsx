import React from "react";
import { Skeleton } from "../../ui/skeleton";

const BooksTableSkeleton = () => {
  
  const rows = Array.from({ length: 8 });

  return (
    <div className="bg-white rounded-lg shadow-md w-full">


     
      <div className="border border-gray-200 overflow-hidden w-full">
    

        
        <div className="divide-y divide-gray-200">
          {rows.map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-6 items-center text-center px-4 py-3 hover:bg-blue-50 transition-colors"
            >
             
              <div className="mx-auto w-[90px]">
                <Skeleton className="h-4 w-10 rounded-md" />
              </div>
              
              <div className="mx-auto w-[200px]">
                <Skeleton className="h-4 w-36 rounded-md" />
              </div>
              
              <div className="mx-auto w-[180px]">
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
             
              <div className="mx-auto w-[160px]">
                <Skeleton className="h-4 w-28 rounded-md" />
              </div>
             
              <div className="mx-auto w-[120px]">
                <Skeleton className="h-4 w-16 rounded-md" />
              </div>
              
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
