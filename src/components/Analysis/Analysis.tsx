import React from "react";
import StatsCard from "./StatsCard";
import CustomerStats from "./CostumerStats";
import FeaturedProduct from "./FeaturedProduct";
import SalesAnalytics from "./SalesAnalytics";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-lg border border-gray-300"
        />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total User" value="40,689" change="8.5%" />
        <StatsCard title="Total Books" value="10,293" change="1.3%" />
        <StatsCard title="Total Requests" value="89,000" change="-4.3%" />
        <StatsCard title="Total reserves" value="2,040" change="1.8%" />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CustomerStats />
        <FeaturedProduct />
        <SalesAnalytics />
      </div>
    </div>
  );
};

export default Dashboard;
