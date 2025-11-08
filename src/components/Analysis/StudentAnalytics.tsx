

import { Users } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

interface StudentAnalyticsProps {
  userStats: {
    active_students: number;
    deleted_students: number;
    deactive_students: number;
      };
}

const StudentAnalytics = ({ userStats }:StudentAnalyticsProps) => {
  const total = userStats.active_students + userStats.deleted_students + userStats.deactive_students;
  const data = [
    { name: "Total", count: total, fill: "white" },
    { name: "Active", count: userStats.active_students, fill: "#C3EBFA" },
    { name: "Inactive", count: userStats.deleted_students, fill: "#FAE27C" },
  ];

  return (
    <div className="bg-white rounded-xl w-full h-full p-2">
      <div className="flex justify-start items-center mr-2">
        <h1 className="text-lg font-semibold">شاگردان</h1>
      </div>

      {/* Chart Section */}
      <div className="relative w-full h-[65%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={28}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <Users size={14} />
        </div>
      </div>

      {/* Info Section */}
      <div className="flex justify-between gap-16 mt-2">
        <div className="flex flex-col gap-1 items-center">
          <div className="h-5 w-5 rounded-full bg-[#C3EBFA]" />
          <h1 className="font-bold">{userStats.active_students}</h1>
          <h2 className="text-xs text-gray-400">فعال</h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="h-5 w-5 rounded-full bg-gray-300" />
          <h1 className="font-bold">{total}</h1>
          <h2 className="text-xs text-gray-400">مجموع</h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="h-5 w-5 rounded-full bg-[#FAE27C]" />
          <h1 className="font-bold">{userStats.deactive_students}</h1>
          <h2 className="text-xs text-gray-400">غیر فعال</h2>
        </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;
