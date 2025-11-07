
import { MoreHorizontal, Users } from "lucide-react";
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Total", count: 106, fill: "white" },
  { name: "Girls", count: 53, fill: "#FAE27C" },
  { name: "Boys", count: 53, fill: "#C3EBFA" },
];

const TeacherAnalytics
 = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-2">
      <div className="flex justify-start items-center mr-2">
        <h1 className="text-lg font-semibold">استادان</h1>
        {/* <MoreHorizontal size={18} /> */}
      </div>

      {/* Chart Section */}
      <div className=" relative w-full h-[65%]"> 
        <ResponsiveContainer >
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={28}
            data={data}
          >
            <RadialBar
             
              background
              dataKey="count"
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <Users size={14}/>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex justify-between gap-16 mt-2">
        <div className="flex flex-col gap-1 items-center">
          <div className="h-5 w-5 rounded-full bg-[#C3EBFA]" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-400">فعال (55%)</h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="h-5 w-5 rounded-full bg-[#C3EBFA]" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-400">مجموع</h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="h-5 w-5 rounded-full bg-[#FAE27C]" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-400">غیر فعال (45%)</h2>
        </div>
      </div>
    </div>
  );
};
export default TeacherAnalytics
;