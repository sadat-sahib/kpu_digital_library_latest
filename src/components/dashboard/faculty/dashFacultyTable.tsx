
import React from "react";
import { Loader } from "lucide-react";
import { useGetFaculties } from "../../../config/client/DashFacultyApi.query";

const DashFacultyTable: React.FC = () => {
  const { data: faculties, isLoading } = useGetFaculties();

  return (
    <div className="flex mt-6 mb-6">
      {isLoading ? (
        <div className="flex justify-center items-center w-full py-6">
          <Loader size={32} className="animate-spin text-blue-600" />
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="flex w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">آی دی</th>
              <th className="py-3 px-6 text-left">نام</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {faculties && faculties.length > 0 ? (
              faculties.map((faculty) => (
                <tr
                  key={faculty.id}
                  className="flex border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{faculty.id}</td>
                  <td className="py-3 px-6 text-left">{faculty.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-3">
                  No faculties available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashFacultyTable;
