import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import axios from '../../../axiosInstance';
import { useAdminAuthStore } from '../../../Store/useAdminAuthStore';

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
  'yes': 'موجود',
  'no': 'موجود نیست'
};

const BooksReport: React.FC = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAdminAuthStore();
  const [statusFilter, setStatusFilter] = useState<string>('');

  // Fetch categories on component mount
  useEffect(() => {
    axios.get("/api/dashboard/categories", {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      setCategories(response.data.data);
    });
  }, [token]);

  // Fetch departments on component mount
  useEffect(() => {
    axios.get("/api/dashboard/departments", {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      setDepartments(response.data.data);
    });
  }, [token]);

  // Handle category selection
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value ? parseInt(e.target.value, 10) : null;
    setSelectedCategory(categoryId);
  };

  // Handle department selection
  const handleDepartmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const deptId = e.target.value ? parseInt(e.target.value, 10) : null;
    setSelectedDepartment(deptId);
  };

  // Handle status filter change
  const handleStatusFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  // Fetch books when filters change
  useEffect(() => {
    setLoading(true);
    axios.post('/api/dashboard/reports/books', {
      category: selectedCategory ? selectedCategory.toString() : 'all',
      department: selectedDepartment ? selectedDepartment.toString() : 'all'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setBooks(response.data.data || []);
      console.log('Books fetched:', response.data.data);
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    });
  }, [selectedCategory, selectedDepartment, token]);

  // Get current category name
  const getCategoryName = () => {
    if (!selectedCategory) return 'همه کتگوری‌ها';
    return categories.find(c => c.id === selectedCategory)?.name || 'همه کتگوری‌ها';
  };

  // Get current department name
  const getDepartmentName = () => {
    if (!selectedDepartment) return 'همه دیپارتمنت‌ها';
    return departments.find(d => d.id === selectedDepartment)?.name || 'همه دیپارتمنت‌ها';
  };

  // Apply status filter to books
  const filteredBooks = books.filter(book => {
    return statusFilter === '' || book.borrow === statusFilter;
  });

  // Handle print
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && reportRef.current) {
      const categoryName = getCategoryName();
      const departmentName = getDepartmentName();
      
      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>گزارش کتاب‌ها</title>
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
                ${categoryName ? 'کتگوری: ' + categoryName + '; ' : ''}
                ${departmentName ? 'دیپارتمنت: ' + departmentName + '; ' : ''}
                ${statusFilter ? 'وضعیت: ' + statusNames[statusFilter] : ''}
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
                ${filteredBooks.length > 0 ? 
                  filteredBooks.map(book => `
                    <tr>
                      <td>${book.title}</td>
                      <td>${book.author}</td>
                      <td>${book.category}</td>
                      <td class="status-${book.borrow}">
                        ${statusNames[book.borrow]}
                      </td>
                      <td>${book.department || '-'}</td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td colspan="5" style="text-align: center;">هیچ کتابی یافت نشد</td>
                    </tr>
                  `}
              </tbody>
            </table>
            <div class="report-footer">
              تاریخ تولید: ${new Date().toLocaleDateString('fa-IR')} | تعداد: ${filteredBooks.length} کتاب
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

  return (
    <div ref={reportRef} className="p-4 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">گزارش کتاب‌ها</h1>

        <div className="flex flex-wrap gap-4 mb-6 no-print">
          <div className="flex flex-col flex-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">کتگوری</label>
            <select
              id="category"
              onChange={handleCategoryChange}
              className="border rounded-md p-2"
              value={selectedCategory || ''}
            >
              <option value="">همه کتگوری‌ها</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
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
            >
              <option value="">همه دیپارتمنت‌ها</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>{department.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">وضعیت</label>
            <select
              id="status"
              onChange={handleStatusFilterChange}
              className="border rounded-md p-2"
              value={statusFilter}
            >
              <option value="">همه وضعیت‌ها</option>
              <option value="yes">موجود</option>
              <option value="no">موجود نیست</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">در حال دریافت اطلاعات کتاب‌ها...</div>
        ) : (
          <div className="overflow-x-auto print:overflow-visible">
            <table className="min-w-full divide-y divide-gray-200 print:table print:w-full">
              <thead className="bg-gray-50 print:bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">عنوان</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">نویسنده</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">کتگوری</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">وضعیت</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">دیپارتمنت</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr key={book.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 print:px-2 print:py-2 print:text-sm">{book.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{book.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">
                        {book.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${book.borrow === 'yes' ? 'bg-green-100 text-green-800 print:status-yes' :
                            'bg-red-100 text-red-800 print:status-no'}`}>
                          {statusNames[book.borrow]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{book.department || '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 print:px-2 print:py-2">
                      {statusFilter || selectedDepartment || selectedCategory ? 'هیچ کتابی یافت نشد' : 'لطفاً فیلترهای مورد نظر را انتخاب کنید'}
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
            disabled={filteredBooks.length === 0}
            className={`bg-blue-600 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 
              ${filteredBooks.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
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

export default BooksReport;