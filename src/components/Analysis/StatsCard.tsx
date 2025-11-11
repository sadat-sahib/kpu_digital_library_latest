import React from "react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <div className="flex justify-center items-center gap-2">
        <h3 className="text-gray-500">{title}</h3>
        <span>{icon}</span>
      </div>
      
      <p className="text-2xl font-bold mt-2">{value}</p>

    </div>
  );
};

export default StatsCard;

