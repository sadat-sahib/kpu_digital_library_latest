// import { View } from 'lucide-react';
// import React from 'react';

// interface Book {
//   id: number;
//   book_title: string;
//   book_author: string;
//   return_date: string;
//   reserve_date: string;
// }

// interface BookTableProps {
//   books: Book[];
//   onView: (id: number) => void;
// }

// const ReservedTable: React.FC<BookTableProps> = ({ books, onView }) => {
//   console.log(books);
//   return (
//     <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//       <table className="min-w-full table-auto">
//         <thead>
//           <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//             <th className="py-3 px-6 text-right">عنوان</th>
//             <th className="py-3 px-6 text-right">نویسنده</th>
//             <th className="py-3 px-6 text-right">تاریخ اجرا</th>
//             <th className="py-3 px-6 text-right">تاریخ بازگشت</th>
//             <th className="py-3 px-6 text-center">عملیات</th>
//           </tr>
//         </thead>
//         <tbody className="text-gray-600 text-sm font-light">
//           {books.map((book) => (
//             <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-100">
//               <td className="py-3 px-6 text-right whitespace-nowrap">
//                 <div className="font-medium">{book.book_title}</div>
//               </td>
//               <td className="py-3 px-6 text-right">{book.book_author}</td>
//               <td className="py-3 px-6 text-right">{book.reserve_date}</td>
//               <td className="py-3 px-6 text-right">{book.return_date}</td>
//               <td className="py-3 px-6 text-center">
//                 <div className="flex item-center justify-center">
//                   <button
//                     onClick={() => onView(book.id)}
//                     className="w-8 h-8 mr-2 transform text-green-400 hover:text-green-500 hover:scale-110 flex items-center justify-center"

//                   >
//                       <View height={20} width={20}/>
//                   </button>

//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReservedTable;

import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { View } from "lucide-react";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ReservedTableSkeleton from "./reservedSkeleton";
import { toJalaliPersian } from "../../../utils/dateUtils";

interface Book {
  id: number;
  book_title: string;
  book_author: string;
  return_date: string;
  reserve_date: string;
}

interface ReservedTableProps {
  books: Book[];
  onView: (id: number) => void;
  loading?: boolean;
}

const ReservedTable: React.FC<ReservedTableProps> = ({
  books,
  onView,
  loading,
}) => {
  const [filterText, setFilterText] = useState("");

  // Filtered list by search
  const filteredBooks = books.filter(
    (book) =>
      book.book_title.toLowerCase().includes(filterText.toLowerCase()) ||
      book.book_author.toLowerCase().includes(filterText.toLowerCase())
  );

  // Export to Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(books);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ReservedBooks");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "reserved_books.xlsx");
  };

  // Define table columns
  const columns: TableColumn<Book>[] = [
    {
    name: "عنوان کتاب",
    selector: (row) => row.book_title,
    sortable: true,
  },
  {
    name: "نویسنده",
    selector: (row) => row.book_author,
    sortable: true,
  },
  {
    name: "تاریخ اجرا",
    selector: (row) => toJalaliPersian(row.reserve_date), // Convert to Persian
    sortable: true,
  },
  {
    name: "تاریخ بازگشت",
    selector: (row) => toJalaliPersian(row.return_date), // Convert to Persian
    sortable: true,
  },
    {
      name: "عملیات",
      cell: (row) => (
        <button
          onClick={() => onView(row.id)}
          className="text-green-500 hover:text-green-600 flex items-center justify-center"
        >
          <View size={18} />
        </button>
      ),
      center: true,
      width: "100px",
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

  // Custom header for search + export
  const SubHeader = (
    <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 px-2">
      <input
        type="text"
        placeholder="جستجو..."
        className="border border-gray-300 rounded-full py-1 px-3 w-60 focus:ring-1 focus:ring-blue-400 focus:outline-none"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <div className="flex gap-2">
        <CSVLink
          data={books}
          filename="reserved_books.csv"
          className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 text-sm"
        >
          CSV
        </CSVLink>
        <button
          onClick={exportExcel}
          className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 text-sm"
        >
          Excel
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <DataTable
        title="لیست کتاب‌های ثبت شده📚"
        columns={columns}
        data={filteredBooks}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 20, 50]}
        highlightOnHover
        striped
        responsive
        subHeader
        subHeaderComponent={SubHeader}
        persistTableHead
        progressPending={loading}
        progressComponent={<ReservedTableSkeleton />}
        customStyles={customStyles}
      />
    </div>
  );
};

export default ReservedTable;
