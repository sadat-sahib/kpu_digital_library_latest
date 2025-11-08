
import { Skeleton } from "../../ui/skeleton";

const ReservedTableSkeleton = () => {
  
  const rows = Array.from({ length: 8 });

  return (
    <div className="bg-white  rounded-lg shadow-md w-full">
 

    
      <div className="border border-gray-200 overflow-hidden w-full">


 
        <div className="divide-y divide-gray-200">
          {rows.map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-5 items-center text-center px-4 py-3 hover:bg-blue-50 transition-colors"
            >
              {/* عنوان کتاب */}
              <div className="mx-auto w-[240px]">
                <Skeleton className="h-4 w-40 rounded-md" />
              </div>
              {/* نویسنده */}
              <div className="mx-auto w-[200px]">
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
              {/* تاریخ اجرا */}
              <div className="mx-auto w-[160px]">
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>
              {/* تاریخ بازگشت */}
              <div className="mx-auto w-[160px]">
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>
              {/* عملیات */}
              <div className="flex items-center justify-center gap-3 w-[100px] mx-auto">
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservedTableSkeleton;
