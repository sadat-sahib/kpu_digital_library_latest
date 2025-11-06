// import React from "react";

// const FeaturedProduct: React.FC = () => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow text-center">
//       <h3 className="text-lg font-semibold">New added books</h3>
//       <div className="my-4">
//         {/* Placeholder for product image or icon */}
//         <div className="w-full h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
//           <span>Image Here</span>
//         </div>
//       </div>
//       <p className="text-md font-semibold mt-2">Information system 2019</p>
//       <p className="text-blue-500 text-lg font-semibold">$89.00</p>
//     </div>
//   );
// };

// export default FeaturedProduct;



import { MoreHorizontal, Users } from "lucide-react";
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Total", count: 106, fill: "white" },
  { name: "Girls", count: 53, fill: "#FAE27C" },
  { name: "Boys", count: 53, fill: "#C3EBFA" },
];

const FeaturedProduct = () => {
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
export default FeaturedProduct;