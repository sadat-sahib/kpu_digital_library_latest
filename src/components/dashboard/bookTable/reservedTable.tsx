
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

  
  const filteredBooks = books.filter(
    (book) =>
      book.book_title.toLowerCase().includes(filterText.toLowerCase()) ||
      book.book_author.toLowerCase().includes(filterText.toLowerCase())
  );


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
