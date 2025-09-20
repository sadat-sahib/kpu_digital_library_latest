
import React from "react";
import { Loader } from "lucide-react";
import { useGetCategory } from "../../../config/client/DashCategoryRegistrationApi.query";

const DashCategoryTable: React.FC = () => {
  const { data, isLoading } = useGetCategory();
  console.log('cat data',data);

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
            {data && data.length > 0 ? (
              data.map((category: { id: number; name: string }) => (
                <tr
                  key={category.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{category.id}</td>
                  <td className="py-3 px-6">{category.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-3">
                  No categories available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashCategoryTable;
