
import React, { useState, useRef, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "../../../axiosInstance";
import { Download, Printer } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import BooksTableSkeleton from "./BooksTableSkeleton";

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  department: string;
  category: string;
  borrow: "yes" | "no";
}

interface Category {
  id: number;
  name: string;
}

interface Department {
  id: number;
  name: string;
}

const statusNames = {
  yes: "موجود",
  no: "موجود نیست",
};

const BooksReport: React.FC = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  // const { token } = useAdminAuthStore();
  const [statusFilter, setStatusFilter] = useState<"yes" | "no" | "">("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch categories
  useEffect(() => {
    axios
      .get("/api/dashboard/categories", {
        // headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      })
      .then((response) => setCategories(response.data.data));
  }, []);

  // Fetch departments
  useEffect(() => {
    axios
      .get("/api/dashboard/departments", {
        withCredentials: true
      })
      .then((response) => setDepartments(response.data.data));
  }, []);

  // Fetch books on filter change
  useEffect(() => {
    setLoading(true);
    axios
      .post(
        "/api/dashboard/reports/books",
        {
          category: selectedCategory ? selectedCategory.toString() : "all",
          department: selectedDepartment
            ? selectedDepartment.toString()
            : "all",
        },
        // { headers: { Authorization: `Bearer ${token}` } }
        { withCredentials: true }
      )
      .then((response) => {
        setBooks(response.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCategory, selectedDepartment]);

  // Get category & department names
  const getCategoryName = () =>
    selectedCategory
      ? categories.find((c) => c.id === selectedCategory)?.name ||
        "همه کتگوری‌ها"
      : "همه کتگوری‌ها";

  const getDepartmentName = () =>
    selectedDepartment
      ? departments.find((d) => d.id === selectedDepartment)?.name ||
        "همه دیپارتمنت‌ها"
      : "همه دیپارتمنت‌ها";

  // 🔹 Excel Export Logic
  const handleDownloadExcel = () => {
    const filteredBooks = books.filter(
      (book) =>
        (statusFilter === "" || book.borrow === statusFilter) &&
        (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (filteredBooks.length === 0) {
      alert("هیچ داده‌ای برای دانلود وجود ندارد.");
      return;
    }

    const categoryName = getCategoryName();
    const departmentName = getDepartmentName();

    // Prepare data for Excel
    const excelData = filteredBooks.map((book, index) => ({
      شماره: index + 1,
      عنوان: book.title,
      نویسنده: book.author,
      کتگوری: book.category,
      دیپارتمنت: book.department,
      وضعیت: statusNames[book.borrow],
    }));

    // Create worksheet & workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Books");

    // Add some metadata
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        ["گزارش کتاب‌ها"],
        [
          `کتگوری: ${categoryName}`,
          `دیپارتمنت: ${departmentName}`,
          `تاریخ: ${new Date().toLocaleDateString("fa-IR")}`,
        ],
        [],
      ],
      { origin: "A1" }
    );

    // Convert to blob and download
    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `گزارش کتاب‌ها.xlsx`);
  };

  // 🔹 Print logic (no change)
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const categoryName = getCategoryName();
      const departmentName = getDepartmentName();
      const filteredBooks = books.filter(
        (book) =>
          (statusFilter === "" || book.borrow === statusFilter) &&
          (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; direction: rtl; }
              h1 { color: #2c3e50; text-align: center; margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              th { background-color: #f8f9fa; text-align: right; padding: 8px; border: 1px solid #ddd; }
              td { padding: 8px; border: 1px solid #ddd; text-align: right; }
              .status-yes { background-color: #d4edda; color: #155724; }
              .status-no { background-color: #f8d7da; color: #721c24; }
              .report-header { margin-bottom: 20px; text-align: center; }
              .report-footer { margin-top: 20px; font-size: 12px; text-align: center; color: #6c757d; }
              .filter-info { margin-bottom: 15px; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="report-header">
              <h3>امارت اسلامی افغانستان</h3>
              <h4>وزارت تحصیلات عالی</h4>
              <h5>پوهنتون پولی تخنیک کابل</h5>
              <h6>معاونیت تحقیقات و مجله علمی</h6>
              <h6>مدیریت عمومی کتابخانه</h6>
              <div class="filter-info">
                ${categoryName ? "کتگوری: " + categoryName + "; " : ""}
                ${departmentName ? "دیپارتمنت: " + departmentName + "; " : ""}
                ${
                  statusFilter
                    ? "وضعیت: " + statusNames[statusFilter as "yes" | "no"]
                    : ""
                }
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>عنوان</th>
                  <th>نویسنده</th>
                  <th>کتگوری</th>
                  <th>وضعیت</th>
                  <th>دیپارتمنت</th>
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
                        <td>${book.category}</td>
                        <td class="status-${book.borrow}">${
                            statusNames[book.borrow]
                          }</td>
                        <td>${book.department || "-"}</td>
                      </tr>`
                        )
                        .join("")
                    : `<tr><td colspan="5" style="text-align: center;">هیچ کتابی یافت نشد</td></tr>`
                }
              </tbody>
            </table>
            <div class="report-footer">
              تاریخ تولید: ${new Date().toLocaleDateString("fa-IR")} | تعداد: ${
        filteredBooks.length
      } کتاب
            </div>
          </body>
        </html>
      `;

      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    } else {
      alert("پنجره چاپ باز نشد! لطفاً اجازه پاپ‌آپ را فعال کنید.");
    }
  };

  // 🔹 Filtered data for table
  const filteredBooks = books.filter(
    (book) =>
      (statusFilter === "" || book.borrow === statusFilter) &&
      (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const columns = [
    { name: "عنوان", selector: (row: Book) => row.title, sortable: true },
    { name: "نویسنده", selector: (row: Book) => row.author, sortable: true },
    { name: "کتگوری", selector: (row: Book) => row.category, sortable: true },
    {
      name: "وضعیت",
      cell: (row: Book) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            row.borrow === "yes"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {statusNames[row.borrow]}
        </span>
      ),
      sortable: true,
    },
    {
      name: "دیپارتمنت",
      selector: (row: Book) => row.department,
      sortable: true,
    },
  ];

  return (
    <div ref={reportRef} className="p-4 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">گزارش کتاب‌ها</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex flex-col flex-1 min-w-[180px]">
            <label className="text-sm font-medium mb-1">کتگوری</label>
            <select
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              className="border rounded-md p-2"
              value={selectedCategory || ""}
            >
              <option value="">همه کتگوری‌ها</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
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
              {departments.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col flex-1 min-w-[180px]">
            <label className="text-sm font-medium mb-1">وضعیت</label>
            <select
              onChange={(e) =>
                setStatusFilter(e.target.value as "yes" | "no" | "")
              }
              className="border rounded-md p-2"
              value={statusFilter}
            >
              <option value="">همه وضعیت‌ها</option>
              <option value="yes">موجود</option>
              <option value="no">موجود نیست</option>
            </select>
          </div>

          <div className="flex flex-col flex-1 min-w-[180px]">
            <label className="text-sm font-medium mb-1">جستجو</label>
            <input
              type="text"
              placeholder="جستجو بر اساس عنوان یا نویسنده..."
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

        {/* Data Table */}
{loading ? (
  <BooksTableSkeleton />
) : (
  <DataTable
    columns={columns}
    data={filteredBooks}
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
          fontSize: "16px",
          paddingTop: "14px",
          paddingBottom: "14px",
          justifyContent: "center",
        },
      },
      cells: {
        style: {
          fontSize: "15px",
          paddingTop: "12px",
          paddingBottom: "12px",
          justifyContent: "center",
        },
      },
      rows: {
        style: {
          minHeight: "55px",
        },
      },
    }}
  />
)}

      </div>
    </div>
  );
};

export default BooksReport;
