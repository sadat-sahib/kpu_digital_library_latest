

import React, { useState, useRef, useEffect } from "react";
import axios from "../../../axiosInstance";
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx";
import StudentsReportTableSkeleton from "./StudentSkeleton";

export interface Student {
  user_id: string;
  username: string;
  email: string;
  faculty: string;
  department: string;
  year: number;
  booksCheckedOut: number;
}

interface Faculty {
  id: number;
  name: string;
  departments: Department[];
}

interface Department {
  id: number;
  name: string;
}

const StudentsReport: React.FC = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<number | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    axios
      .get("/api/home/faculties-with-departments")
      .then((res) => {
        setFaculties(res.data.faculties || []);
      })
      .catch(() => {
        setFaculties([]);
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    axios
      .post(
        "/api/dashboard/reports/students",
        {
          fac_id: selectedFaculty || "all",
          dep_id: selectedDepartment || "all",
        },
        {
         
          withCredentials: true,
        }
      )
      .then((res) => {
        setStudents(res.data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setStudents([]);
        setLoading(false);
      });
  }, [selectedFaculty, selectedDepartment]);

  // helper names for print header
  const getFacultyName = () =>
    selectedFaculty
      ? faculties.find((f) => f.id === selectedFaculty)?.name || "نامشخص"
      : "همه دانشکده‌ها";

  const getDepartmentName = () => {
    if (!selectedDepartment) return "همه رشته‌ها";
    for (const f of faculties) {
      const d = f.departments.find((dep) => dep.id === selectedDepartment);
      if (d) return d.name;
    }
    return "نامشخص";
  };

  // client-side filtered list (search applied)
  const filteredStudents = students.filter((s) => {
    if (!searchTerm) return true;
    const t = searchTerm.toLowerCase();
    return (
      (s.username || "").toLowerCase().includes(t) ||
      (s.email || "").toLowerCase().includes(t) ||
      (s.user_id || "").toLowerCase().includes(t)
    );
  });

  // columns for DataTable
  const columns = [
    { name: "نام", selector: (r: Student) => r.username, sortable: true },
    {
      name: "دیپارتمنت",
      selector: (r: Student) => r.department,
      sortable: true,
    },
    { name: "پوهنځی", selector: (r: Student) => r.faculty, sortable: true },
    { name: "آی‌دی محصل", selector: (r: Student) => r.user_id, sortable: true },
    { name: "ایمیل", selector: (r: Student) => r.email, sortable: true },
  ];

  // Download Excel (filtered data)
  const handleDownloadExcel = () => {
    if (filteredStudents.length === 0) {
      alert("هیچ داده‌ای برای دانلود وجود ندارد.");
      return;
    }
    const mapped = filteredStudents.map((s) => ({
      نام: s.username,
      دیپارتمنت: s.department,
      پوهنځی: s.faculty,
      "آی‌دی محصل": s.user_id,
      ایمیل: s.email,
    }));
    const ws = XLSX.utils.json_to_sheet(mapped);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(
      wb,
      `Students_Report_${new Date().toLocaleDateString("fa-IR")}.xlsx`
    );
  };

  // Print: KEEP THE PRINT CONTENT EXACTLY as original, but use filteredStudents
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("پنجره چاپ باز نشد! لطفاً اجازه پاپ آپ را فعال کنید.");
      return;
    }

    const facultyName = getFacultyName();
    const departmentName = getDepartmentName();

    const html = `<!DOCTYPE html>
<html>
  <head>
    <title>گزارش محصلین</title>
    <meta charset="utf-8" />
    <style>
      body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; direction: rtl; }
      h1 { color: #2c3e50; text-align: center; margin-bottom: 20px; }
      table { width: 100%; border-collapse: collapse; margin-top: 10px; }
      th { background-color: #f8f9fa; text-align: right; padding: 8px; border: 1px solid #ddd; }
      td { padding: 8px; border: 1px solid #ddd; text-align: right; }
      .book-count-0 { background-color: #d4edda; color: #155724; }
      .book-count-warning { background-color: #fff3cd; color: #856404; }
      .book-count-danger { background-color: #f8d7da; color: #721c24; }
      .report-header { margin-bottom: 20px; text-align: center; }
      .report-footer { margin-top: 20px; font-size: 12px; text-align: center; color: #6c757d; }
      .filter-info { margin-bottom: 15px; font-size: 14px; }
    </style>
  </head>
  <body>
    <div class="report-header">
      <h3>امارت اسلامی افغانستان</h3>
      <h3>وزارت تحصیلات عالی</h3>
      <h4>پوهنتون پولی تخنیک کابل</h4>
      <h5>معاونیت تحقیقات و مجله علمی</h5>
      <h6>مدیریت عمومی کتابخانه</h6>
      <div class="filter-info">
        ${facultyName ? "دانشکده: " + facultyName + "; " : ""}
        ${departmentName ? "رشته: " + departmentName : ""}
      </div>
    </div>
    
    <table>
      <thead>
        <tr>
          <th>نام</th>
          <th>دیپارتمنت</th>
          <th>پوهنځی</th>
          <th>آی‌دی محصل</th>
          <th>ایمیل</th>
        </tr>
      </thead>
      <tbody>
        ${
          filteredStudents.length > 0
            ? filteredStudents
                .map((student) => {
                  // attempt to get readable dept/faculty names if IDs are strings — keep original logic
                  const deptName =
                    faculties
                      .flatMap((f) => f.departments)
                      .find((d) => String(d.id) === String(student.department))
                      ?.name || student.department;
                  const facultyNameFromList =
                    faculties.find(
                      (f) => String(f.id) === String(student.faculty)
                    )?.name || student.faculty;
                  return `<tr>
                    <td>${student.username}</td>
                    <td>${deptName}</td>
                    <td>${facultyNameFromList}</td>
                    <td>${student.user_id}</td>
                    <td>${student.email}</td>
                  </tr>`;
                })
                .join("")
            : `<tr><td colspan="5" style="text-align:center;">هیچ محصل یافت نشد</td></tr>`
        }
      </tbody>
    </table>
    <div class="report-footer">
      تاریخ تولید: ${new Date().toLocaleDateString("fa-IR")} | تعداد کل: ${
      filteredStudents.length
    } محصل
    </div>
  </body>
</html>`;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div ref={reportRef} className="p-4 w-full overflow-hidden">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 max-w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">گزارش محصلین</h1>

        {/* filters row: faculty + department (single row) */}
        <div className="flex flex-wrap items-center gap-4 mb-7">
          <div className="w-60 min-w-[160px]">
            <label className="block text-sm font-medium mb-1">پوهنځی</label>
            <select
              onChange={(e) => {
                const val = e.target.value
                  ? parseInt(e.target.value, 10)
                  : null;
                setSelectedFaculty(val);
                setSelectedDepartment(null);
              }}
              value={selectedFaculty ?? ""}
              className="border rounded-md p-2 w-full"
            >
              <option value="">همه پوهنځی‌ها</option>
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-60 min-w-[160px]">
            <label className="block text-sm font-medium mb-1">دیپارتمنت</label>
            <select
              onChange={(e) => {
                const val = e.target.value
                  ? parseInt(e.target.value, 10)
                  : null;
                setSelectedDepartment(val);
              }}
              value={selectedDepartment ?? ""}
              disabled={!selectedFaculty}
              className="border rounded-md p-2 w-full disabled:opacity-60"
            >
              <option value="">همه دیپارتمنت‌ها</option>
              {selectedFaculty &&
                faculties
                  .find((f) => f.id === selectedFaculty)
                  ?.departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
            </select>
          </div>
        </div>

        {/* second row: search + buttons (separate row) */}
        <div className="flex flex-wrap items-center gap-4 mb-3">
          <div className="flex-1 min-w-[220px] mb-6">
            <label className="block text-sm font-medium mb-1">جستجو</label>
            <input
              type="text"
              placeholder="جستجوی نام یا ایمیل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" p-2 border border-gray-300 bg-white dark:bg-gray-900 w-full rounded-full h-9 focus:ring-2  outline-none focus:outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 transition-all"
            />
          </div>

          <div className="ml-auto flex gap-2">
            <button
              onClick={handlePrint}
              disabled={filteredStudents.length === 0}
              className={`bg-blue-600 text-white px-4 py-2 rounded-md text-sm ${
                filteredStudents.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              چاپ گزارش
            </button>

            <button
              onClick={handleDownloadExcel}
              disabled={filteredStudents.length === 0}
              className={`bg-green-600 text-white px-4 py-2 rounded-md text-sm ${
                filteredStudents.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-700"
              }`}
            >
              دانلود Excel
            </button>
          </div>
        </div>

        {/* table wrapper: reduced width, centered, scroll only within this box */}
        <div className="mx-auto max-w-4xl border rounded-md overflow-x-auto">
{loading ? (
  <StudentsReportTableSkeleton />
) : (
  <DataTable
    columns={columns}
    data={filteredStudents}
    pagination
    paginationPerPage={10}
    paginationRowsPerPageOptions={[5, 10, 20, 50]}
    highlightOnHover
    dense={false}
    responsive
    customStyles={{
      headCells: {
        style: {
          fontSize: "15px",
          fontWeight: "700",
          backgroundColor: "#f9fafb",
        },
      },
      cells: { style: { fontSize: "14px" } },
    }}
    noDataComponent="هیچ محصل یافت نشد"
  />
)}
  
        </div>
      </div>
    </div>
  );
};

export default StudentsReport;
