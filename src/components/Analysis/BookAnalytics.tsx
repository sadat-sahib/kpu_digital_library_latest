
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";


interface BookAnalyticsProps {
  bookStats: {
    total_books: number;
    pdf_books: number;
    hard_books: number;
    both_format_books: number;
  };
}

const BookAnalytics = ({ bookStats }:BookAnalyticsProps) => {
  const data = [
    { name: "Total", count: bookStats.total_books, fill: "white" },
    { name: "Requested", count: bookStats.pdf_books, fill: "#C3EBFA" },
    { name: "Registered", count: bookStats.both_format_books, fill: "#FAE27C" },
  ];

  return (
    <div className="bg-white rounded-xl w-full h-full p-2">
      <div className="flex justify-start items-center">
        <h1 className="text-lg font-semibold mr-2">کتاب ها</h1>
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
          📚
        </div>
      </div>

      {/* Info Section */}
      <div className="flex justify-between gap-16 mt-2">
        <div className="flex flex-col gap-1 items-center">
          <div className="h-5 w-5 rounded-full bg-[#C3EBFA]" />
          <h1 className="font-bold">{bookStats.pdf_books}</h1>
          <h2 className="text-xs text-gray-400">PDF</h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="h-5 w-5 rounded-full bg-[#FAE27C]" />
          <h1 className="font-bold">{bookStats.both_format_books}</h1>
          <h2 className="text-xs text-gray-400">ثبت شده</h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <h1 className="font-bold">{bookStats.total_books}</h1>
          <h2 className="text-xs text-gray-400">مجموع</h2>
        </div>
      </div>
    </div>
  );
};

export default BookAnalytics;
