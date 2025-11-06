// import React from "react";

// const CustomerStats: React.FC = () => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow text-center">
//       <h3 className="text-lg font-semibold">Students</h3>
//       <div className="flex justify-center my-4">
//         <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
//           {/* Replace with an actual chart or icon as needed */}
//           <span className="text-blue-500 text-2xl font-semibold">●</span>
//         </div>
//       </div>
//       <div className="flex justify-around text-center">
//         <div>
//           <p className="text-xl font-semibold">34,249</p>
//           <p className="text-sm text-gray-500">New Students</p>
//         </div>
//         <div>
//           <p className="text-xl font-semibold">1,420</p>
//           <p className="text-sm text-gray-500">Repeated</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerStats;


import { MoreHorizontal } from "lucide-react";
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Total", count: 106, fill: "white" },
  { name: "Girls", count: 53, fill: "#FAE27C" },
  { name: "Boys", count: 53, fill: "#C3EBFA" },
];

const CustomerStats = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-2">
      <div className="flex justify-start items-center">
        <h1 className="text-lg font-semibold mr-2">کتاب ها</h1>
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
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">📚</div>
      </div>

      {/* Info Section */}
      <div className="flex justify-between gap-16 mt-2">
        <div className="flex flex-col gap-1 items-center">
          <div className="h-5 w-5 rounded-full bg-[#C3EBFA]" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-400">درخواست شده (55%)</h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="h-5 w-5 rounded-full bg-[#C3EBFA]" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-400">مجموع</h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="h-5 w-5 rounded-full bg-[#FAE27C]" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-400">ثبت شده (45%)</h2>
        </div>
      </div>
    </div>
  );
};
export default CustomerStats;