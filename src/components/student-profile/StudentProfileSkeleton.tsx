
import { Skeleton } from "../ui/skeleton";


export default function StudentProfileSkeleton() {
  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 p-4">


      {/* Profile Section */}
      <div className="w-full lg:w-[300px] space-y-4">
        {/* Profile Card */}
        <div className="p-4 border rounded-xl shadow-sm space-y-4">
          <div className="flex justify-center">
            <Skeleton className="w-24 h-24 rounded-full" />
          </div>
          <div className="space-y-2 text-center">
            <Skeleton className="h-4 w-32 mx-auto" />
            <Skeleton className="h-3 w-40 mx-auto" />
            <div className="flex justify-center gap-2 mt-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="p-4 border rounded-xl shadow-sm space-y-4">
          {Array(7).fill(null).map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-32" />
            </div>
          ))}
        </div>
        
      </div>
            {/* Books Section */}
            <div className="flex-1 space-y-6">
        <div>
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array(3).fill(null).map((_, i) => (
              <Skeleton key={i} className="w-full h-48 rounded-xl" />
            ))}
          </div>
        </div>

        <div>
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array(2).fill(null).map((_, i) => (
              <Skeleton key={i} className="w-full h-48 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
