import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import axios from '../../../axiosInstance';
import { useAdminAuthStore } from '../../../Store/useAdminAuthStore';

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
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAdminAuthStore();

  // Fetch faculties on component mount
  useEffect(() => {
    axios.get("/api/home/faculties-with-departments").then((response) => {
      setFaculties(response.data.faculties);
    });
  }, []);

  // Handle faculty selection
  const handleFacultyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const facultyId = e.target.value ? parseInt(e.target.value, 10) : null;
    setSelectedFaculty(facultyId);
    setSelectedDepartment(null);
  };

  // Handle department selection
  const handleDepartmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const deptId = e.target.value ? parseInt(e.target.value, 10) : null;
    setSelectedDepartment(deptId);
  };

  // Fetch students when filters change
  useEffect(() => {
    setLoading(true);
    axios.post('/api/dashboard/reports/students', {
      fac_id: selectedFaculty || 'all',
      dep_id: selectedDepartment || 'all'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      console.log('Fetched students:', response.data);
      setStudents(response.data.data || []);
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    });
  }, [selectedFaculty, selectedDepartment]);

  // Get current faculty name
  const getFacultyName = () => {
    if (!selectedFaculty) return 'همه دانشکده‌ها';
    return faculties.find(f => f.id === selectedFaculty)?.name || 'همه دانشکده‌ها';
  };

  // Get current department name
  const getDepartmentName = () => {
    if (!selectedDepartment) return 'همه رشته‌ها';
    if (!selectedFaculty) {
      for (const faculty of faculties) {
        const dept = faculty.departments.find(d => d.id === selectedDepartment);
        if (dept) return dept.name;
      }
      return 'همه رشته‌ها';
    }
    const faculty = faculties.find(f => f.id === selectedFaculty);
    return faculty?.departments.find(d => d.id === selectedDepartment)?.name || 'همه رشته‌ها';
  };

  // Handle print
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && reportRef.current) {
      const facultyName = getFacultyName();
      const departmentName = getDepartmentName();
      
const printContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>گزارش محصلین</title>
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
          ${facultyName ? 'دانشکده: ' + facultyName + '; ' : ''}
          ${departmentName ? 'رشته: ' + departmentName : ''}
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
          ${students.length > 0 ? 
            students.map(student => {
              const deptName = faculties.flatMap(f => f.departments)
                .find(d => d.id.toString() === student.department)?.name || student.department;
              const facultyName = faculties.find(f => f.id.toString() === student.faculty)?.name || student.faculty;
              return `
              <tr>
                <td>${student.username}</td>
                <td>${deptName}</td>
                <td>${facultyName}</td>
                <td>${student.user_id}</td>
                <td>${student.email}</td>
              </tr>
            `}).join('') : `
              <tr>
                <td colspan="5" style="text-align: center;">هیچ محصل یافت نشد</td>
              </tr>
            `}
        </tbody>
      </table>
      <div class="report-footer">
        تاریخ تولید: ${new Date().toLocaleDateString('fa-IR')} | تعداد کل: ${students.length} محصل
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
      alert('مشکل در باز کردن پنجره چاپ! لطفاً اجازه پاپ‌آپ را فعال کنید.');
    }
  };

  return (
    <div ref={reportRef} className="p-4 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">گزارش محصلین</h1>
        
        <div className="flex flex-wrap gap-4 mb-6 no-print">
          <div className="flex flex-col flex-1">
            <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">پوهنځی</label>
            <select 
              id="faculty" 
              onChange={handleFacultyChange}
              className="border rounded-md p-2"
              value={selectedFaculty || ''}
            >
              <option value="">همه پوهنځی‌ها</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">دیپارتمنت</label>
            <select 
              id="department" 
              onChange={handleDepartmentChange}
              className="border rounded-md p-2"
              value={selectedDepartment || ''}
              disabled={!selectedFaculty}
            >
              <option value="">همه دیپارتمنت‌ها</option>
              {selectedFaculty && faculties.find(f => f.id === selectedFaculty)?.departments.map((department) => (
                <option key={department.id} value={department.id}>{department.name}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">در حال دریافت اطلاعات محصلین...</div>
        ) : (
          <div className="overflow-x-auto print:overflow-visible">
            <table className="min-w-full divide-y divide-gray-200 print:table print:w-full">
              <thead className="bg-gray-50 print:bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">نام</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">دیپارتمنت</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">پوهنځی</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">آی‌دی محصل</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">ایمیل</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.length > 0 ? (
                  students.map((student) => {
                    const deptName = faculties.flatMap(f => f.departments)
                      .find(d => d.id.toString() === student.department)?.name || student.department;
                    return (
                      <tr key={student.user_id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 print:px-2 print:py-2 print:text-sm">{student.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">
                          {deptName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${student.booksCheckedOut === 0 ? 'bg-green-100 text-green-800 print:book-count-0' : 
                              student.booksCheckedOut > 3 ? 'bg-red-100 text-red-800 print:book-count-danger' : 
                              'bg-yellow-100 text-yellow-800 print:book-count-warning'}`}>
                            {student.faculty}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{student.user_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{student.email}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 print:px-2 print:py-2">
                      {selectedFaculty || selectedDepartment ? 'هیچ محصل یافت نشد' : 'برای مشاهده محصلین یک رشته را انتخاب کنید'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex justify-end no-print">
          <button
            onClick={handlePrint}
            disabled={students.length === 0}
            className={`bg-blue-600 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 
              ${students.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            چاپ گزارش
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentsReport;