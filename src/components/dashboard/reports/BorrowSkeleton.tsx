
import { Skeleton } from "../../ui/skeleton";

const BorrowedBooksTableSkeleton = () => {
  // how many rows & columns to mimic
  const rows = Array.from({ length: 8 });
  const columns = ["عنوان کتاب", "نویسنده", "نام محصل", "آی‌دی محصل", "ایمیل", "تاریخ بازگشت"];

  return (
    <div className="border rounded-lg overflow-hidden mt-4">
      {/* Table Header */}
      <div className="grid grid-cols-6 bg-muted/40 px-4 py-3 text-center font-semibold text-sm text-gray-600">
        {columns.map((col, i) => (
          <div key={i}>{col}</div>
        ))}
      </div>

      {/* Skeleton Rows */}
      <div className="divide-y">
        {rows.map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-6 items-center text-center px-4 py-3"
          >
            {columns.map((_, j) => (
              <Skeleton
                key={j}
                className="h-5 w-24 mx-auto rounded-md bg-muted animate-pulse"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowedBooksTableSkeleton;
