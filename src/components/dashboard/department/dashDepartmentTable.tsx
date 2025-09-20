

import React from "react";
import { Loader } from "lucide-react";
import { useGetFacultiesWithDepartments } from "../../../config/client/DashDepartmentRegisterApi.query";

const DashDepartmentTable: React.FC = () => {
  const { data: faculties, isLoading } = useGetFacultiesWithDepartments();

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
              <th className="py-3 px-6">پوهنځی</th>
              <th className="py-3 px-6">دیپارتمنت</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {faculties && faculties.length > 0 ? (
              faculties.map((faculty) => (
                <tr
                  key={faculty.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{faculty.name}</td>
                  <td className="py-3 px-6">
                    {faculty.departments.length > 0 ? (
                      <ol className="list-decimal pl-6">
                        {faculty.departments.map((department) => (
                          <li key={department.id} className="my-2 text-gray-700">
                            {department.name}
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p>No departments available</p>
                    )}
                  </td>
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

export default DashDepartmentTable;
