// import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
// import axios from '../../../axiosInstance';
// import { useAdminAuthStore } from '../../../Store/useAdminAuthStore';

// export interface Book {
//   id: string;
//   title: string;
//   author: string;
//   isbn: string;
//   department: string;
//   category: string;
//   borrow: "yes" | "no";
// }

// interface Category {
//   id: number;
//   name: string;
// }

// interface Department {
//   id: number;
//   name: string;
// }

// const statusNames = {
//   'yes': 'موجود',
//   'no': 'موجود نیست'
// };

// const BooksReport: React.FC = () => {
//   const reportRef = useRef<HTMLDivElement>(null);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [departments, setDepartments] = useState<Department[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
//   const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(false);
//   const { token } = useAdminAuthStore();
//   const [statusFilter, setStatusFilter] = useState<string>('');

//   // Fetch categories on component mount
//   useEffect(() => {
//     axios.get("/api/dashboard/categories", {
//       headers: { Authorization: `Bearer ${token}` }
//     }).then((response) => {
//       setCategories(response.data.data);
//     });
//   }, [token]);

//   // Fetch departments on component mount
//   useEffect(() => {
//     axios.get("/api/dashboard/departments", {
//       headers: { Authorization: `Bearer ${token}` }
//     }).then((response) => {
//       setDepartments(response.data.data);
//     });
//   }, [token]);

//   // Handle category selection
//   const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     const categoryId = e.target.value ? parseInt(e.target.value, 10) : null;
//     setSelectedCategory(categoryId);
//   };

//   // Handle department selection
//   const handleDepartmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     const deptId = e.target.value ? parseInt(e.target.value, 10) : null;
//     setSelectedDepartment(deptId);
//   };

//   // Handle status filter change
//   const handleStatusFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     setStatusFilter(e.target.value);
//   };

//   // Fetch books when filters change
//   useEffect(() => {
//     setLoading(true);
//     axios.post('/api/dashboard/reports/books', {
//       category: selectedCategory ? selectedCategory.toString() : 'all',
//       department: selectedDepartment ? selectedDepartment.toString() : 'all'
//     }, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(response => {
//       setBooks(response.data.data || []);
//       console.log('Books fetched:', response.data.data);
//       setLoading(false);
//     })
//     .catch(() => {
//       setLoading(false);
//     });
//   }, [selectedCategory, selectedDepartment, token]);

//   // Get current category name
//   const getCategoryName = () => {
//     if (!selectedCategory) return 'همه کتگوری‌ها';
//     return categories.find(c => c.id === selectedCategory)?.name || 'همه کتگوری‌ها';
//   };

//   // Get current department name
//   const getDepartmentName = () => {
//     if (!selectedDepartment) return 'همه دیپارتمنت‌ها';
//     return departments.find(d => d.id === selectedDepartment)?.name || 'همه دیپارتمنت‌ها';
//   };

//   // Apply status filter to books
//   const filteredBooks = books.filter(book => {
//     return statusFilter === '' || book.borrow === statusFilter;
//   });

//   // Handle print
//   const handlePrint = () => {
//     const printWindow = window.open('', '_blank');
//     if (printWindow && reportRef.current) {
//       const categoryName = getCategoryName();
//       const departmentName = getDepartmentName();

//       const printContent = `
//         <!DOCTYPE html>
//         <html>
//           <head>
//             <style>
//               body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; direction: rtl; }
//               h1 { color: #2c3e50; text-align: center; margin-bottom: 20px; }
//               table { width: 100%; border-collapse: collapse; margin-top: 10px; }
//               th { background-color: #f8f9fa; text-align: right; padding: 8px; border: 1px solid #ddd; }
//               td { padding: 8px; border: 1px solid #ddd; text-align: right; }
//               .status-yes { background-color: #d4edda; color: #155724; }
//               .status-no { background-color: #f8d7da; color: #721c24; }
//               .report-header { margin-bottom: 20px; text-align: center; }
//               .report-footer { margin-top: 20px; font-size: 12px; text-align: center; color: #6c757d; }
//               .filter-info { margin-bottom: 15px; font-size: 14px; }
//             </style>
//           </head>
//           <body>
//             <div class="report-header">
//               <h3>امارت اسلامی افغانستان</h3>
//               <h4>وزارت تحصیلات عالی</h4>
//               <h5>پوهنتون پولی تخنیک کابل</h5>
//               <h6>معاونیت تحقیقات و مجله علمی</h6>
//               <h6>مدیریت عمومی کتابخانه</h6>
//               <div class="filter-info">
//                 ${categoryName ? 'کتگوری: ' + categoryName + '; ' : ''}
//                 ${departmentName ? 'دیپارتمنت: ' + departmentName + '; ' : ''}
//                 ${statusFilter ? 'وضعیت: ' + statusNames[statusFilter] : ''}
//               </div>
//             </div>

//             <table>
//               <thead>
//                 <tr>
//                   <th>عنوان</th>
//                   <th>نویسنده</th>
//                   <th>کتگوری</th>
//                   <th>وضعیت</th>
//                   <th>دیپارتمنت</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 ${filteredBooks.length > 0 ?
//                   filteredBooks.map(book => `
//                     <tr>
//                       <td>${book.title}</td>
//                       <td>${book.author}</td>
//                       <td>${book.category}</td>
//                       <td class="status-${book.borrow}">
//                         ${statusNames[book.borrow]}
//                       </td>
//                       <td>${book.department || '-'}</td>
//                     </tr>
//                   `).join('') : `
//                     <tr>
//                       <td colspan="5" style="text-align: center;">هیچ کتابی یافت نشد</td>
//                     </tr>
//                   `}
//               </tbody>
//             </table>
//             <div class="report-footer">
//               تاریخ تولید: ${new Date().toLocaleDateString('fa-IR')} | تعداد: ${filteredBooks.length} کتاب
//             </div>
//           </body>
//         </html>
//       `;

//       printWindow.document.write(printContent);
//       printWindow.document.close();
//       printWindow.focus();
//       setTimeout(() => {
//         printWindow.print();
//         printWindow.close();
//       }, 500);
//     } else {
//       alert('پنجره چاپ باز نشد! لطفاً اجازه پاپ آپ را فعال کنید.');
//     }
//   };

//   return (
//     <div ref={reportRef} className="p-4 max-w-6xl mx-auto">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-2xl font-bold mb-6 text-center">گزارش کتاب‌ها</h1>

//         <div className="flex flex-wrap gap-4 mb-6 no-print">
//           <div className="flex flex-col flex-1">
//             <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">کتگوری</label>
//             <select
//               id="category"
//               onChange={handleCategoryChange}
//               className="border rounded-md p-2"
//               value={selectedCategory || ''}
//             >
//               <option value="">همه کتگوری‌ها</option>
//               {categories.map((category) => (
//                 <option key={category.id} value={category.id}>{category.name}</option>
//               ))}
//             </select>
//           </div>

//           <div className="flex flex-col flex-1">
//             <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">دیپارتمنت</label>
//             <select
//               id="department"
//               onChange={handleDepartmentChange}
//               className="border rounded-md p-2"
//               value={selectedDepartment || ''}
//             >
//               <option value="">همه دیپارتمنت‌ها</option>
//               {departments.map((department) => (
//                 <option key={department.id} value={department.id}>{department.name}</option>
//               ))}
//             </select>
//           </div>

//           <div className="flex flex-col flex-1">
//             <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">وضعیت</label>
//             <select
//               id="status"
//               onChange={handleStatusFilterChange}
//               className="border rounded-md p-2"
//               value={statusFilter}
//             >
//               <option value="">همه وضعیت‌ها</option>
//               <option value="yes">موجود</option>
//               <option value="no">موجود نیست</option>
//             </select>
//           </div>
//         </div>

//         {loading ? (
//           <div className="text-center py-8">در حال دریافت اطلاعات کتاب‌ها...</div>
//         ) : (
//           <div className="overflow-x-auto print:overflow-visible">
//             <table className="min-w-full divide-y divide-gray-200 print:table print:w-full">
//               <thead className="bg-gray-50 print:bg-gray-100">
//                 <tr>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">عنوان</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">نویسنده</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">کتگوری</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">وضعیت</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">دیپارتمنت</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredBooks.length > 0 ? (
//                   filteredBooks.map((book) => (
//                     <tr key={book.id}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 print:px-2 print:py-2 print:text-sm">{book.title}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{book.author}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">
//                         {book.category}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                           ${book.borrow === 'yes' ? 'bg-green-100 text-green-800 print:status-yes' :
//                             'bg-red-100 text-red-800 print:status-no'}`}>
//                           {statusNames[book.borrow]}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{book.department || '-'}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 print:px-2 print:py-2">
//                       {statusFilter || selectedDepartment || selectedCategory ? 'هیچ کتابی یافت نشد' : 'لطفاً فیلترهای مورد نظر را انتخاب کنید'}
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <div className="mt-6 flex justify-end no-print">
//           <button
//             onClick={handlePrint}
//             disabled={filteredBooks.length === 0}
//             className={`bg-blue-600 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2
//               ${filteredBooks.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
//             </svg>
//             چاپ گزارش
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BooksReport;

import React, { useState, useRef, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "../../../axiosInstance";
import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";
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
  const { token } = useAdminAuthStore();
  const [statusFilter, setStatusFilter] = useState<"yes" | "no" | "">("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch categories
  useEffect(() => {
    axios
      .get("/api/dashboard/categories", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCategories(response.data.data));
  }, [token]);

  // Fetch departments
  useEffect(() => {
    axios
      .get("/api/dashboard/departments", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setDepartments(response.data.data));
  }, [token]);

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
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setBooks(response.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCategory, selectedDepartment, token]);

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
