

import React from "react";
import { Loader } from "lucide-react";
import { useGetSection } from "../../../config/client/DashSectionApi.query";

const DashSectionTable: React.FC = () => {
  const { data: sections, isLoading } = useGetSection();
  console.log("Fetched sections:", sections);

  return (
    <div className="mt-6">
      {isLoading ? (
        <div className="flex justify-center items-center py-6">
          <Loader size={32} className="animate-spin text-blue-600" />
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">آی دی</th>
              <th className="py-3 px-6">نام</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {sections && sections.length > 0 ? (
              sections.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{s.id}</td>
                  <td className="py-3 px-6">{s.section}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-3">
                  No sections available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashSectionTable;
