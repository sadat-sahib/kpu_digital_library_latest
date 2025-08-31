import React from "react";
import { FaBars } from "react-icons/fa";
type Props = {
  toggleSidebar: () => void;
};

const TopBar: React.FC<Props> = ({ toggleSidebar }) => {
  return (
    <div className="bg-white shadow-md h-14 px-6 flex md:justify-between items-center sticky top-0 z-30">
      <h1 className="text-2xl font-bold text-gray-600">داشبورد</h1>
      <button className="sm:hidden" onClick={toggleSidebar}>
        <FaBars className="h-6 w-6" />
      </button> 
      <div className="flex items-center gap-2">
      </div>
    </div>
  );
};

export default TopBar;
