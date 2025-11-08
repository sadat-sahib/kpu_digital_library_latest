// import React from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// const data = [
//   { year: 2015, sales: 50, profit: 40 },
//   { year: 2016, sales: 60, profit: 50 },
//   { year: 2017, sales: 55, profit: 45 },
//   { year: 2018, sales: 70, profit: 60 },
//   { year: 2019, sales: 85, profit: 75 },
// ];

// const SalesAnalytics: React.FC = () => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow text-center">
//       <h3 className="text-lg font-semibold">Request Analytics</h3>
//       <ResponsiveContainer width="100%" height={200}>
//         <LineChart data={data}>
//           <XAxis dataKey="year" />
//           <YAxis />
//           <Tooltip />
//           <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
//           <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default SalesAnalytics;


import { MoreHorizontal, Users } from "lucide-react";
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Total", count: 106, fill: "white" },
  { name: "Girls", count: 53, fill: "#FAE27C" },
  { name: "Boys", count: 53, fill: "#C3EBFA" },
];

const SalesAnalytics = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-2">
      <div className="flex justify-start items-center mr-2">
        <h1 className="text-lg font-semibold">شاگردان</h1>
        
      </div>

     
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
export default SalesAnalytics;