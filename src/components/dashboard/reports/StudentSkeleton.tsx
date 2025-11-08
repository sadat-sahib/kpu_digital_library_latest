import React from "react";
import { Skeleton } from "../../ui/skeleton";


const StudentsReportTableSkeleton = () => {
  // Simulate 8 loading rows
  const rows = Array.from({ length: 8 });

  // Column definitions (matching StudentsReport)
  const columns = [
    { label: "نام", width: "w-[120px]" },
    { label: "دیپارتمنت", width: "w-[140px]" },
    { label: "پوهنځی", width: "w-[140px]" },
    { label: "آی‌دی محصل", width: "w-[100px]" },
    { label: "ایمیل", width: "w-[180px]" },
  ];

  return (
    <div className="mx-auto max-w-4xl border rounded-md overflow-x-auto">
      {/* Header */}
      <div className="grid grid-cols-5 bg-gray-50 dark:bg-gray-800 text-center font-semibold text-sm py-3 px-4">
        {columns.map((col, i) => (
          <div key={i} className={`${col.width}`}>
            {col.label}
          </div>
        ))}
      </div>

      {/* Skeleton Rows */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {rows.map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 items-center text-center px-4 py-[14px]"
          >
            {columns.map((col, j) => (
              <Skeleton
                key={j}
                className={`h-5 ${col.width} mx-auto rounded-md bg-muted animate-pulse`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsReportTableSkeleton;
