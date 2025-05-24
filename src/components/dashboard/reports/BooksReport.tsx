import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import axios from '../../../axiosInstance';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  type: 'textbook' | 'reference' | 'fiction' | 'non-fiction' | 'periodical';
  status: 'available' | 'checked-out' | 'lost' | 'reserved';
  dueDate?: string;
  checkedOutBy?: string;
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

const BooksReport: React.FC = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookFilters, setBookFilters] = useState({
    type: '',
    status: ''
  });

  // Fetch faculties on component mount
  useEffect(() => {
    axios.get("/api/home/faculties-with-departments").then((response) => {
      setFaculties(response.data.faculties);
    });
  }, []);

  // Handle faculty selection
  const handleFacultyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const facultyId = parseInt(e.target.value, 10);
    const faculty = faculties.find(f => f.id === facultyId) || null;
    setSelectedFaculty(faculty);
    setSelectedDepartment('');
  };

  // Handle department selection
  const handleDepartmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const deptId = e.target.value;
    setSelectedDepartment(deptId);
  };

  // Fetch books when department is selected
  useEffect(() => {
    if (selectedDepartment) {
      setLoading(true);
      axios.get(`/api/books?departmentId=${selectedDepartment}`)
        .then(response => {
          setBooks(response.data.books);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [selectedDepartment]);

  // Apply additional filters to books
  const filteredBooks = books.filter(book => {
    return (
      (bookFilters.type === '' || book.type === bookFilters.type) &&
      (bookFilters.status === '' || book.status === bookFilters.status)
    );
  });

  // Handle print
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && reportRef.current) {
      const facultyName = selectedFaculty?.name || 'تمام دانشکده ها';
      const departmentName = selectedFaculty?.departments.find(d => d.id.toString() === selectedDepartment)?.name || 'تمام بخش ها';
      
      const typeNames: Record<string, string> = {
        'textbook': 'کتاب درسی',
        'reference': 'منبع مرجع',
        'fiction': 'داستانی',
        'non-fiction': 'غیر داستانی',
        'periodical': 'ادواری'
      };

      const statusNames: Record<string, string> = {
        'available': 'موجود',
        'checked-out': 'امانت گرفته شده',
        'lost': 'گم شده',
        'reserved': 'رزرو شده'
      };

      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>گزارش کتاب ها</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; direction: rtl; }
              h1 { color: #2c3e50; text-align: center; margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              th { background-color: #f8f9fa; text-align: right; padding: 8px; border: 1px solid #ddd; }
              td { padding: 8px; border: 1px solid #ddd; text-align: right; }
              .status-available { background-color: #d4edda; color: #155724; }
              .status-checkedout { background-color: #fff3cd; color: #856404; }
              .status-lost { background-color: #f8d7da; color: #721c24; }
              .status-reserved { background-color: #cce5ff; color: #004085; }
              .report-header { margin-bottom: 20px; text-align: center; }
              .report-footer { margin-top: 20px; font-size: 12px; text-align: center; color: #6c757d; }
              .filter-info { margin-bottom: 15px; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="report-header">
              <h3>دانشگاه پلی تکنیک کابل</h3>
              <h1>گزارش کتاب ها</h1>
              <div class="filter-info">
                ${facultyName ? 'دانشکده: ' + facultyName + '; ' : ''}
                ${departmentName ? 'بخش: ' + departmentName + '; ' : ''}
                ${bookFilters.type ? 'نوع: ' + typeNames[bookFilters.type] + '; ' : ''}
                ${bookFilters.status ? 'وضعیت: ' + statusNames[bookFilters.status] : ''}
              </div>
            </div>
            
            <table>
              <thead>
                <tr>
                  <th>عنوان</th>
                  <th>نویسنده</th>
                  <th>نوع</th>
                  <th>وضعیت</th>
                  <th>تاریخ بازگشت</th>
                </tr>
              </thead>
              <tbody>
                ${filteredBooks.length > 0 ? 
                  filteredBooks.map(book => `
                    <tr>
                      <td>${book.title}</td>
                      <td>${book.author}</td>
                      <td>${typeNames[book.type] || book.type}</td>
                      <td class="status-${book.status.replace('-', '')}">
                        ${statusNames[book.status] || book.status}
                      </td>
                      <td>${book.dueDate || '-'}</td>
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
        <h1 className="text-2xl font-bold mb-6 text-center">گزارش کتاب ها</h1>
        
        <div className="flex flex-wrap gap-4 mb-6 no-print">
          <div className="flex flex-col flex-1">
            <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">دانشکده</label>
            <select 
              id="faculty" 
              onChange={handleFacultyChange}
              className="border rounded-md p-2"
              value={selectedFaculty?.id || ''}
            >
              <option value="">همه دانشکده ها</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">بخش</label>
            <select 
              id="department" 
              onChange={handleDepartmentChange}
              className="border rounded-md p-2"
              value={selectedDepartment}
              disabled={!selectedFaculty}
            >
              <option value="">همه بخش ها</option>
              {selectedFaculty?.departments.map((department) => (
                <option key={department.id} value={department.id.toString()}>{department.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6 no-print">
          <div className="flex flex-col flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">نوع کتاب</label>
            <select
              className="border rounded-md p-2"
              value={bookFilters.type}
              onChange={(e) => setBookFilters({...bookFilters, type: e.target.value})}
            >
              <option value="">همه انواع</option>
              <option value="textbook">کتاب درسی</option>
              <option value="reference">منبع مرجع</option>
              <option value="fiction">داستانی</option>
              <option value="non-fiction">غیر داستانی</option>
              <option value="periodical">ادواری</option>
            </select>
          </div>

          <div className="flex flex-col flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">وضعیت</label>
            <select
              className="border rounded-md p-2"
              value={bookFilters.status}
              onChange={(e) => setBookFilters({...bookFilters, status: e.target.value})}
            >
              <option value="">همه وضعیت ها</option>
              <option value="available">موجود</option>
              <option value="checked-out">امانت گرفته شده</option>
              <option value="lost">گم شده</option>
              <option value="reserved">رزرو شده</option>
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
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">عنوان</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">نویسنده</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">نوع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">وضعیت</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">تاریخ بازگشت</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr key={book.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 print:px-2 print:py-2 print:text-sm">{book.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{book.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">
                        {{
                          'textbook': 'کتاب درسی',
                          'reference': 'منبع مرجع',
                          'fiction': 'داستانی',
                          'non-fiction': 'غیر داستانی',
                          'periodical': 'ادواری'
                        }[book.type] || book.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${book.status === 'available' ? 'bg-green-100 text-green-800 print:status-available' : 
                            book.status === 'checked-out' ? 'bg-yellow-100 text-yellow-800 print:status-checkedout' :
                            book.status === 'lost' ? 'bg-red-100 text-red-800 print:status-lost' : 
                            'bg-blue-100 text-blue-800 print:status-reserved'}`}>
                          {{
                            'available': 'موجود',
                            'checked-out': 'امانت گرفته شده',
                            'lost': 'گم شده',
                            'reserved': 'رزرو شده'
                          }[book.status] || book.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{book.dueDate || '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 print:px-2 print:py-2">
                      {selectedDepartment ? 'هیچ کتابی یافت نشد' : 'لطفاً یک بخش را برای مشاهده کتاب ها انتخاب کنید'}
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
            disabled={!selectedDepartment || filteredBooks.length === 0}
            className={`bg-blue-600 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 
              ${(!selectedDepartment || filteredBooks.length === 0) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
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