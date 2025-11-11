
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { CheckCircle, Loader, View } from "lucide-react";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "../../../axiosInstance";


// src/types/User.ts
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  current_residence: string;
  original_residence: string;
  phone: string;
  type: string;
  department: string;
  faculty: string;
  nic: string;
  nin: string;
}




interface UserTableProps {
  users: User[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  loadingDelete?: number | null;
  component?: string;
  refetchData?: () => void ;
}

const DeActiveEmployeeTable: React.FC<UserTableProps> = ({
  users,
  onView,
  // onEdit,
  // onDelete,
  refetchData,
  // loadingDelete,
  
  component = "Users",
}) => {
  const [filterText, setFilterText] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("");

  const [loadingActivating, setLoadingActivating] = useState<number | null>(null);
   const [_successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleClick = (user_id: number | undefined) => {
    if (!user_id) return;
    setLoadingActivating(user_id);
    axios
      .post(
        `api/dashboard/users/activate_user/${user_id}`,
        {},
        {
            withCredentials: true,
        }
      )
      .then((response) => {
        setSuccessMessage(`User ${user_id} activated successfully`);
        console.log(response);
         refetchData?.();
      })
      .catch((error) => {
        console.error("Error:", error);
      }).finally(() => {
        setLoadingActivating(null);
        setTimeout(() => setSuccessMessage(null), 3000);
      });
  };


  // Filter users by search + faculty
  const filteredUsers = users.filter(
    (u) =>
      (u.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
       u.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
       u.email.toLowerCase().includes(filterText.toLowerCase())) &&
      (!facultyFilter || u.faculty === facultyFilter)
  );

  // Export Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "users.xlsx");
  };

  const columns: TableColumn<User>[] = [
    { name: "آی‌دی", selector: (row) => row.id, sortable: true, width: "90px" },
    { name: "نام", selector: (row) => row.firstName, sortable: true },
    { name: "تخلص", selector: (row) => row.lastName, sortable: true },
    { name: "ایمیل", selector: (row) => row.email, sortable: true, grow: 2 },
    
{
  name: "عملیات",
  cell: (row) => (
    <div className="flex items-center justify-center gap-2">
      {component === "Deactivate-Users" && (
        <button
          onClick={() => handleClick(row.id)}
          disabled={loadingActivating === row.id}
          className="text-blue-500 hover:text-blue-600"
        >
          {loadingActivating === row.id ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            <CheckCircle size={18} />
          )}
        </button>
      )}

      <button onClick={() => onView(row.id)} className="text-green-500 hover:text-green-600">
        <View size={18} />
      </button>
    </div>
  ),
  center: true,
  width: "200px",
}

  ];

  const customStyles = {
    headRow: { style: { backgroundColor: "#f3f4f6", fontSize: "16px", fontWeight: "bold" } },
    headCells: { style: { paddingLeft: "16px", paddingRight: "16px" } },
    cells: { style: { paddingLeft: "16px", paddingRight: "16px" } },
    rows: {
      style: {
        minHeight: "50px",
        "&:nth-child(even)": { backgroundColor: "#f9fafb" },
        "&:hover": { backgroundColor: "#e0f2fe" },
      },
    },
  };

  const SubHeaderComponent = (
    <div className="flex flex-col md:flex-row justify-between items-center gap-2 w-full px-2">
      <input
        type="text"
        placeholder="جستجو..."
        className="w-full md:w-64 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <select
        value={facultyFilter}
        onChange={(e) => setFacultyFilter(e.target.value)}
        className="w-full md:w-48 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">همه پوهنځی‌ها</option>
        {Array.from(new Set(users.map((u) => u.faculty).filter(Boolean))).map((faculty) => (
          <option key={faculty} value={faculty}>
            {faculty}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <CSVLink
          data={filteredUsers}
          filename="users.csv"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          CSV
        </CSVLink>
        <button
          onClick={exportExcel}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Excel
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 20, 50]}
        highlightOnHover
        striped
        responsive
        subHeader
        subHeaderComponent={SubHeaderComponent}
        persistTableHead
        noDataComponent="هیچ کاربری یافت نشد"
        customStyles={customStyles}
        
      />
    </div>
  );
};

export default DeActiveEmployeeTable;
