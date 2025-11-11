
import React, { useState, useRef, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "../../../axiosInstance";
import { Download, Printer } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import BorrowedBooksTableSkeleton from "./BorrowSkeleton";

export interface BorrowedBook {
  id: string;
  title: string;
  author: string;
  status: "checked-out";
  borrowed_at: string;
  return_by: string;
  username: string;
  user_id: string;
  department: string;
  faculty: string;
  email: string;
}

interface Department {
  id: number;
  name: string;
}

interface Faculty {
  id: number;
  name: string;
}

const BorrowsReport: React.FC = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<number | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(false);
  // const { token } = useAdminAuthStore();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch faculties and departments
  useEffect(() => {
    axios
      .get("/api/dashboard/faculties", {
        // headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => setFaculties(res.data.data));

    axios
      .get("/api/dashboard/departments", {
        // headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => setDepartments(res.data.data));

    fetchBorrowedBooks();
  }, []);

  // Fetch borrowed books
  const fetchBorrowedBooks = (
    facultyId?: number | null,
    departmentId?: number | null
  ) => {
    setLoading(true);
    axios
      .post(
        "/api/dashboard/reports/reserves",
        {
          faculty_id: facultyId ? facultyId.toString() : "all",
          dep_id: departmentId ? departmentId.toString() : "all",
        },
        { 
          // headers: { Authorization: `Bearer ${token}` }
          withCredentials: true
         }
      )
      .then((response) => {
        setBorrowedBooks(response.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  // Filters
  useEffect(() => {
    fetchBorrowedBooks(selectedFaculty, selectedDepartment);
  }, [selectedFaculty, selectedDepartment]);

  const getFacultyName = () => {
    if (!selectedFaculty) return "همه پوهنځی‌ها";
    return faculties.find((f) => f.id === selectedFaculty)?.name || "";
  };

  const getDepartmentName = () => {
    if (!selectedDepartment) return "همه دیپارتمنت‌ها";
    return departments.find((d) => d.id === selectedDepartment)?.name || "";
  };

  // Filter books by search
  const filteredBooks = borrowedBooks.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Books:", filteredBooks);

  // ✅ Excel Export
  const handleDownloadExcel = () => {
    if (filteredBooks.length === 0)
      return alert("هیچ داده‌ای برای دانلود وجود ندارد!");
    const worksheet = XLSX.utils.json_to_sheet(
      filteredBooks.map((b) => ({
        "عنوان کتاب": b.title,
        نویسنده: b.author,
        "نام محصل": b.username,
        "آی‌دی محصل": b.user_id,
        ایمیل: b.email,
        دیپارتمنت: b.department,
        پوهنځی: b.faculty,
        "تاریخ بازگشت": new Date(b.return_by).toLocaleDateString("fa-IR"),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Borrowed Books");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "BorrowedBooksReport.xlsx");
  };

  // ✅ Print
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const departmentName = getDepartmentName();
      const facultyName = getFacultyName();
      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; direction: rtl; margin: 0; padding: 20px; color: #333; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
              th { background-color: #f8f9fa; }
              .report-header { text-align: center; margin-bottom: 20px; }
              .report-footer { margin-top: 20px; text-align: center; font-size: 12px; color: #6c757d; }
            </style>
          </head>
          <body>
            <div class="report-header">
              <h3>امارت اسلامی افغانستان</h3>
              <h4>وزارت تحصیلات عالی</h4>
              <h5>پوهنتون پولی تخنیک کابل</h5>
              <h6>معاونیت تحقیقات و مجله علمی</h6>
              <h6>مدیریت عمومی کتابخانه</h6>
              <div>${facultyName} | ${departmentName}</div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>عنوان کتاب</th>
                  <th>نویسنده</th>
                  <th>نام محصل</th>
                  <th>آی‌دی محصل</th>
                  <th>ایمیل</th>
                  <th>دیپارتمنت</th>
                  <th>تاریخ بازگشت</th>
                </tr>
              </thead>
              <tbody>
                ${
                  filteredBooks.length > 0
                    ? filteredBooks
                        .map(
                          (book) => `
                    <tr>
                      <td>${book.title}</td>
                      <td>${book.author}</td>
                      <td>${book.username}</td>
                      <td>${book.user_id}</td>
                      <td>${book.email}</td>
                      <td>${book.department}</td>
                      <td>${new Date(book.return_by).toLocaleDateString(
                        "fa-IR"
                      )}</td>
                    </tr>`
                        )
                        .join("")
                    : `<tr><td colspan="7" style="text-align:center;">هیچ داده‌ای یافت نشد</td></tr>`
                }
              </tbody>
            </table>

            <div class="report-footer">
              تاریخ چاپ: ${new Date().toLocaleDateString("fa-IR")} | تعداد: ${
        filteredBooks.length
      } کتاب
            </div>
          </body>
        </html>`;
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 400);
    }
  };

  // ✅ Table Columns
  const columns = [
    {
      name: "عنوان کتاب",
      selector: (row: BorrowedBook) => row.title,
      sortable: true,
    },
    {
      name: "نویسنده",
      selector: (row: BorrowedBook) => row.author,
      sortable: true,
    },
    {
      name: "نام محصل",
      selector: (row: BorrowedBook) => row.username,
      sortable: true,
    },
    {
      name: "آی‌دی محصل",
      selector: (row: BorrowedBook) => row.user_id,
      sortable: true,
    },
    { name: "ایمیل", selector: (row: BorrowedBook) => row.email },
    // { name: "دیپارتمنت", selector: (row: BorrowedBook) => row.department },
    // { name: "پوهنځی", selector: (row: BorrowedBook) => row.faculty },
    {
      name: "تاریخ بازگشت",
      selector: (row: BorrowedBook) =>
        new Date(row.return_by).toLocaleDateString("fa-IR"),
      sortable: true,
    },
  ];

  return (
    <div ref={reportRef} className="p-4 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          گزارش کتاب‌های امانت گرفته شده
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex flex-col flex-1 min-w-[180px]">
            <label className="text-sm font-medium mb-1">پوهنځی</label>
            <select
              onChange={(e) =>
                setSelectedFaculty(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              className="border rounded-md p-2"
              value={selectedFaculty || ""}
            >
              <option value="">همه پوهنځی‌ها</option>
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col flex-1 min-w-[180px]">
            <label className="text-sm font-medium mb-1">دیپارتمنت</label>
            <select
              onChange={(e) =>
                setSelectedDepartment(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              className="border rounded-md p-2"
              value={selectedDepartment || ""}
            >
              <option value="">همه دیپارتمنت‌ها</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col flex-1 min-w-[180px]">
            <label className="text-sm font-medium mb-1">جستجو</label>
            <input
              type="text"
              placeholder="جستجو بر اساس عنوان یا نام محصل..."
              className=" p-2 border border-gray-300 bg-white dark:bg-gray-900 rounded-full h-9 focus:ring-2  outline-none focus:outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3 w-full mt-2 justify-end">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2"
            >
              <Printer size={18} /> چاپ گزارش
            </button>
            <button
              onClick={handleDownloadExcel}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2"
            >
              <Download size={18} /> دانلود Excel
            </button>
          </div>
        </div>

        {/* DataTable */}
        {loading ? (
            <BorrowedBooksTableSkeleton />
        ):(
      <DataTable
          columns={columns}
          data={filteredBooks}
          progressPending={loading}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 20, 50]}
          highlightOnHover
          dense
          responsive
          customStyles={{
            headCells: {
              style: {
                backgroundColor: "#f9fafb",
                fontWeight: "bold",
                fontSize: "15px",
                justifyContent: "center",
              },
            },
            cells: {
              style: {
                justifyContent: "center",
                fontSize: "14px",
              },
            },
          }}
        />
        )}
  
      </div>
    </div>
  );
};

export default BorrowsReport;
