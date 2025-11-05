// import { CheckCircle, Edit, Loader, Printer, Trash, View } from "lucide-react";
// import React, { useState } from "react";
// import axios from "../../../axiosInstance";
// import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";
// import UserCard from "./UserCard";

// interface User {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
// }

// interface BookTableProps {
//   users: User[];
//   onView: (id: number) => void;
//   onEdit: (id: number) => void;
//   onDelete: (id: number) => void;
//   loadingDelete: number | null;
//   component: string;
//   refetchData: () => void;
// }

// const UserTable: React.FC<BookTableProps> = ({
//   users,
//   onView,
//   onEdit,
//   onDelete,
//   loadingDelete,
//   component,
//   refetchData,
// }) => {
//   const { token } = useAdminAuthStore();
//   const [openPrintModal, setOpenPrintModal] = useState(false);
//   const [userId, setUserId] = useState<number | undefined>();
//   const [loadingActivating, setLoadingActivating] = useState<number | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const handlePrint = (id: number | undefined) => {
//     setOpenPrintModal(true);
//     setUserId(id);
//   };

//   const closePrintModal = () => {
//     setOpenPrintModal(false);
//     setUserId(undefined);
//   };

//   const handleClick = (user_id: number | undefined) => {
//     if (!user_id) return;
//     setLoadingActivating(user_id);
//     axios
//       .post(
//         `/api/dashboard/users/activate_user/${user_id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         setSuccessMessage(`User ${user_id} activated successfully`);
//         console.log(response);
//         refetchData();
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       }).finally(() => {
//         setLoadingActivating(null);
//         setTimeout(() => setSuccessMessage(null), 3000);
//       });
//   };
//   return (
//     <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//       <table className="min-w-full table-auto">
//         <thead>
//           <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//             <th className="py-3 px-6 text-right">آی‌دی</th>
//             <th className="py-3 px-6 text-right">نام</th>
//             <th className="py-3 px-6 text-right">تخلص</th>
//             <th className="py-3 px-6 text-right">ایمیل</th>
//             <th className="py-3 px-6 text-center">عملیات</th>
//           </tr>
//         </thead>
//         <tbody className="text-gray-600 text-sm font-light">
//           {users.map((user) => (
//             <tr
//               key={user.id}
//               className="border-b border-gray-200 hover:bg-gray-100"
//             >
//               <td className="py-3 px-6 text-right whitespace-nowrap">
//                 <div className="font-medium">{user.id}</div>
//               </td>
//               <td className="py-3 px-6 text-right whitespace-nowrap">
//                 <div className="font-medium">{user.firstName}</div>
//               </td>
//               <td className="py-3 px-6 text-right">{user.lastName}</td>
//               <td className="py-3 px-6 text-right">{user.email}</td>
//               <td className="py-3 px-6 text-center">
//                 <div className="flex item-center justify-center">
//                   {component === "Deactivate-Users" && (
//                     <button
//                       className="p-1 text-blue-500 hover:text-blue-700"
//                       onClick={() => handleClick(user.id)}
//                       disabled={loadingActivating === user.id}
//                     >
//                        {loadingActivating === user.id ? (
//                         <Loader size={20} className="animate-spin text-blue-600" />
//                       ) : (
//                         <CheckCircle height={20} width={20} />
//                       )}
//                     </button>
//                   )}
//                   {component === "Users" && (
//                     <button
//                       className="p-1 text-blue-500 hover:text-blue-700"
//                       onClick={() => handlePrint(user.id)}
//                     >
//                       <Printer height={20} width={20} />
//                     </button>
//                   )}
//                   <button
//                     onClick={() => onView(user.id)}
//                     className="w-8 h-8 mr-2 transform text-green-400 hover:text-green-500 hover:scale-110 flex items-center justify-center"
//                   >
//                     <View height={20} width={20} />
//                   </button>
//                   {component === "Users" && (
//                     <button
//                       onClick={() => onEdit(user.id)}
//                       className="w-8 h-8 mr-2 transform text-blue-400 hover:text-blue-500 hover:scale-110 flex items-center justify-center"
//                     >
//                       <Edit height={20} width={20} />
//                     </button>
//                   )}
//                   <button
//                     onClick={() => onDelete(user.id)}
//                     className="w-8 h-8 mr-2 transform text-red-400 hover:text-red-500 hover:scale-110 flex items-center justify-center"
//                     disabled={loadingDelete === user.id}
//                   >
//                     {loadingDelete === user.id ? (
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
//                     ) : (
//                       <Trash height={20} width={20} />
//                     )}
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {openPrintModal && <UserCard closeModal={closePrintModal} id={userId} />}
//       {successMessage && (
//         <div className="mt-4 text-green-500 text-center">{successMessage}</div>
//       )}
//     </div>
//   );
// };

// export default UserTable;

import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  CheckCircle,
  Edit,
  Loader,
  Printer,
  Trash,
  Users,
  View,
} from "lucide-react";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import UserCard from "./userCard";

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
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onView,
  onEdit,
  onDelete,
  loadingDelete,
  component = "Users",
}) => {
  const [filterText, setFilterText] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("");

  const [openPrintModal, setOpenPrintModal] = useState(false);
  const [userId, setUserId] = useState<number | undefined>();

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
    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "users.xlsx");
  };

  const handlePrint = (id: number | undefined) => {
    setOpenPrintModal(true);
    setUserId(id);
  };

  const closePrintModal = () => {
    setOpenPrintModal(false);
    setUserId(undefined);
  };

  const columns: TableColumn<User>[] = [
    { name: "آی‌دی", selector: (row) => row.id, sortable: true, width: "90px" },
    { name: "نام", selector: (row) => row.firstName, sortable: true },
    { name: "تخلص", selector: (row) => row.lastName, sortable: true },
    { name: "ایمیل", selector: (row) => row.email, sortable: true, grow: 2 },
    { name: "پوهنځی", selector: (row) => row.faculty || "-", sortable: true },
    {
      name: "عملیات",
      cell: (row) => (
        <div className="flex items-center justify-center gap-2">
          {component === "Users" && (
            <button
              onClick={() => handlePrint(row.id)} // ✅ added print button
              className="text-blue-500 hover:text-blue-600"
            >
              <Printer size={18} />
            </button>
          )}
          <button
            onClick={() => onView(row.id)}
            className="text-green-500 hover:text-green-600"
          >
            <View size={18} />
          </button>
          <button
            onClick={() => onEdit(row.id)}
            className="text-blue-500 hover:text-blue-600"
          >
            <Edit size={18} />
          </button>

          {/* <button
            onClick={() => onDelete(row.id)}
            disabled={loadingDelete === row.id}
            className="text-red-500 hover:text-red-600"
          >
            {loadingDelete === row.id ? <Loader size={18} className="animate-spin" /> : <Trash size={18} />}
          </button> */}
        </div>
      ),
      center: true,
      width: "150px",
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#f3f4f6",
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
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
        {Array.from(new Set(users.map((u) => u.faculty).filter(Boolean))).map(
          (faculty) => (
            <option key={faculty} value={faculty}>
              {faculty}
            </option>
          )
        )}
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
        // title={
        //   <div className="flex justify-start items-center gap-2">
        //     <span className="text-2xl font-bold">لیست کاربران</span>
        //     <Users size={20} className="text-blue-500" />
        //   </div>
        // }
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
      {openPrintModal && <UserCard closeModal={closePrintModal} id={userId} />}
    </div>
  );
};

export default UserTable;
