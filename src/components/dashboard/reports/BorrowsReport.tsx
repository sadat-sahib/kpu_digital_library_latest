import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import axios from '../../../axiosInstance';
import { useAdminAuthStore } from '../../../Store/useAdminAuthStore';

export interface BorrowedBook {
  id: string;
  title: string;
  author: string;
  status: 'checked-out';
  borrowed_at: string;
  return_by: string;
  username: string;
  user_id: string;
  department: string;
  email: string;
}

interface Department {
  id: number;
  name: string;
}

const BorrowsReport: React.FC = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAdminAuthStore();

  // Fetch departments on component mount
  useEffect(() => {
    axios.get("/api/dashboard/departments", {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      setDepartments(response.data.data);
    });

    // Initial fetch of all borrowed books
    fetchBorrowedBooks();
  }, [token]);

  // Handle department selection
  const handleDepartmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const deptId = e.target.value ? parseInt(e.target.value, 10) : null;
    setSelectedDepartment(deptId);
    fetchBorrowedBooks(deptId);
  };

  // Fetch borrowed books with optional department filter
  const fetchBorrowedBooks = (departmentId?: number | null) => {
    setLoading(true);
    
    axios.post('/api/dashboard/reports/reserves', {
      dep_id: departmentId ? departmentId.toString() : 'all'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setBorrowedBooks(response.data.data || []);
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    });
  };

  // Get current department name
  const getDepartmentName = () => {
    if (!selectedDepartment) return 'همه دیپارتمنت‌ها';
    return departments.find(d => d.id === selectedDepartment)?.name || 'همه دیپارتمنت‌ها';
  };

  // Handle print
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && reportRef.current) {
      const departmentName = getDepartmentName();
      
      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>گزارش کتاب های امانت گرفته شده</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; direction: rtl; }
              h1 { color: #2c3e50; text-align: center; margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              th { background-color: #f8f9fa; text-align: right; padding: 8px; border: 1px solid #ddd; }
              td { padding: 8px; border: 1px solid #ddd; text-align: right; }
              .due-date-warning { background-color: #fff3cd; color: #856404; }
              .due-date-danger { background-color: #f8d7da; color: #721c24; }
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
                ${departmentName ? 'دیپارتمنت: ' + departmentName : ''}
              </div>
            </div>
            
            <table>
              <thead>
                <tr>
                  <th>عنوان کتاب</th>
                  <th>نویسنده</th>
                  <th>نام محصل</th>
                  <th>آی‌دی محصل</th>
                  <th>ایمیل</th>
                  <th>تاریخ بازگشت</th>
                </tr>
              </thead>
              <tbody>
                ${borrowedBooks.length > 0 ? 
                  borrowedBooks.map(book => {
                    const dueDate = new Date(book.return_by);
                    const today = new Date();
                    const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    
                    return `
                    <tr>
                      <td>${book.title}</td>
                      <td>${book.author}</td>
                      <td>${book.username}</td>
                      <td>${book.user_id}</td>
                      <td>${book.email}</td>
                      <td class="${daysUntilDue <= 0 ? 'due-date-danger' : daysUntilDue <= 3 ? 'due-date-warning' : ''}">
                        ${book.return_by}
                        ${daysUntilDue <= 0 ? ' (تاریخ گذشته)' : daysUntilDue <= 3 ? ` (${daysUntilDue} روز باقی مانده)` : ''}
                      </td>
                    </tr>
                  `}).join('') : `
                    <tr>
                      <td colspan="6" style="text-align: center;">هیچ کتاب امانت گرفته شده ای یافت نشد</td>
                    </tr>
                  `}
              </tbody>
            </table>
            <div class="report-footer">
              تاریخ تولید: ${new Date().toLocaleDateString('fa-IR')} | تعداد: ${borrowedBooks.length} کتاب
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
      alert('پنجره چاپ باز نشد! لطفاً اجازه پاپ آپ را فعال کنید.');
    }
  };

  // Check if due date is approaching or passed
  const getDueDateStatus = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const daysUntilDue = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue <= 0) return 'text-red-600 font-bold';
    if (daysUntilDue <= 3) return 'text-yellow-600 font-medium';
    return '';
  };

  return (
    <div ref={reportRef} className="p-4 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">گزارش کتاب های امانت گرفته شده</h1>
        
        <div className="flex flex-wrap gap-4 mb-6 no-print">
          <div className="flex flex-col flex-1">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">دیپارتمنت</label>
            <select 
              id="department" 
              onChange={handleDepartmentChange}
              className="border rounded-md p-2"
              value={selectedDepartment || ''}
            >
              <option value="">همه دیپارتمنت‌ها</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>{department.name}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">در حال دریافت اطلاعات کتاب ها...</div>
        ) : (
          <div className="overflow-x-auto print:overflow-visible">
            <table className="min-w-full divide-y divide-gray-200 print:table print:w-full">
              <thead className="bg-gray-50 print:bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">عنوان کتاب</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">نویسنده</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">نام محصل</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">آی‌دی محصل</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">ایمیل</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">تاریخ بازگشت</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {borrowedBooks.length > 0 ? (
                  borrowedBooks.map((book) => {
                    const dueDateStatus = getDueDateStatus(book.return_by);
                    return (
                      <tr key={book.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 print:px-2 print:py-2 print:text-sm">{book.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{book.author}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{book.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{book.user_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{book.email}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${dueDateStatus} print:px-2 print:py-2 print:text-sm`}>
                          {book.return_by}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 print:px-2 print:py-2">
                      {selectedDepartment ? 'هیچ کتاب امانت گرفته شده ای یافت نشد' : 'لطفاً یک دیپارتمنت را برای مشاهده کتاب ها انتخاب کنید'}
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
            disabled={borrowedBooks.length === 0}
            className={`bg-blue-600 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 
              ${borrowedBooks.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
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

export default BorrowsReport;