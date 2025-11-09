

import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Edit, Trash, View } from "lucide-react";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import BooksTableSkeleton from "./bookTableSkeleton";
import axios from "../../../axiosInstance";
import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";
import { useGetFaculties } from "../../../config/client/DashFacultyApi.query";

interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  publicationYear: string;
  faculty?: string;
}

interface Faculty {
  id: number;
  name: string;
}

interface BookTableProps {
  books: Book[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  loadingDelete: number | null;
  loading: boolean;
}

const BookTable: React.FC<BookTableProps> = ({
  books,
  onView,
  onEdit,
  onDelete,
  loadingDelete,
  loading,
}) => {
  const [filterText, setFilterText] = useState("");
  // const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  // const { token } = useAdminAuthStore();

  // ✅ Fetch faculties once
  // useEffect(() => {
  //   const fetchFaculties = async () => {
  //     try {
  //       const response = await axios.get("/api/dashboard/faculties", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setFaculties(response.data.data || []);
  //     } catch (error) {
  //       console.error("Error fetching faculties:", error);
  //     }
  //   };
  //   fetchFaculties();
  // }, [token]);
  const { data:faculties=[], isPending } = useGetFaculties() 

  
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(filterText.toLowerCase()) ||
      book.author.toLowerCase().includes(filterText.toLowerCase()) ||
      book.publisher.toLowerCase().includes(filterText.toLowerCase());

    const matchesFaculty =
      selectedFaculty === "" || book.faculty === selectedFaculty;

    return matchesSearch && matchesFaculty;
  });

  
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredBooks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Books");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "books.xlsx");
  };

  
  const columns: TableColumn<Book>[] = [
    {
      name: "آی‌دی",
      selector: (row) => row.id,
      sortable: true,
      width: "90px",
      style: { fontSize: "medium" },
    },
    { name: "عنوان کتاب", selector: (row) => row.title, sortable: true },
    { name: "نویسنده", selector: (row) => row.author, sortable: true },
    { name: "ناشر", selector: (row) => row.publisher, sortable: true },
    { name: "سال نشر", selector: (row) => row.publicationYear, sortable: true },
    {
      name: "عملیات",
      cell: (row) => (
        <div className="flex items-center justify-center gap-2">
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
            {loadingDelete === row.id ? (
              <div className="animate-spin h-4 w-4 border-2 border-b-0 border-red-500 rounded-full"></div>
            ) : (
              <Trash size={18} />
            )}
          </button> */}
        </div>
      ),
      center: true,
      width: "180px",
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
    rows: {
      style: {
        minHeight: "50px",
        "&:nth-child(even)": { backgroundColor: "#f9fafb" },
        "&:hover": { backgroundColor: "#e0f2fe" },
      },
    },
  };


  const SubHeader = (
    <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3">
      <div className="flex flex-wrap gap-3 items-center">
      
        <input
          type="text"
          placeholder="جستجو..."
          className="border border-gray-300 rounded-full py-1 px-3 w-60 focus:ring-1 focus:ring-blue-400 focus:outline-none"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

       
        {faculties.length > 0 && (
          <select
            className="border border-gray-300 rounded-full h-9 py-1 px-3 w-52 focus:ring-1 focus:ring-blue-400 focus:outline-none text-gray-700"
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
          >
           
            <option value="">تمام پوهنځی‌ها</option>
            {faculties?.map((faculty) => (
              <option key={faculty.id} value={faculty.name}>
                {faculty.name}
              </option>
            ))}
          </select>
        )}
      </div>

     
      <div className="flex gap-2">
        <CSVLink
          data={filteredBooks}
          filename="books.csv"
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
        title="📚 لیست کتاب‌ها"
        columns={columns}
        data={loading ? Array(6).fill({}) : filteredBooks}
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
        progressComponent={<BooksTableSkeleton />}
        customStyles={customStyles}
      />
    </div>
  );
};

export default BookTable;
