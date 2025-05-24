import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import axios from '../../../axiosInstance';

export interface Student {
  id: string;
  name: string;
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
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

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

  // Fetch students when department is selected
  useEffect(() => {
    if (selectedDepartment) {
      setLoading(true);
      axios.get(`/api/students?departmentId=${selectedDepartment}`)
        .then(response => {
          setStudents(response.data.students);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [selectedDepartment]);

  // Filter students based on selected department
  const filteredStudents = selectedDepartment 
    ? students.filter(student => student.department === selectedDepartment)
    : [];

  // Handle print
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && reportRef.current) {
      const facultyName = selectedFaculty?.name || 'All Faculties';
      const departmentName = selectedFaculty?.departments.find(d => d.id.toString() === selectedDepartment)?.name || 'All Departments';
      
      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Student Report</title>
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
              <h3>پوهنتون پولیتخنک کابل</h3>
              <h1>راپور محصلین</h1>
              <div class="filter-info">
                ${facultyName ? 'پوهنځی: ' + facultyName + '; ' : ''}
                ${departmentName ? 'څانګه: ' + departmentName : ''}
              </div>
            </div>
            
            <table>
              <thead>
                <tr>
                  <th>نوم</th>
                  <th>څانګه</th>
                  <th>د محصل ID</th>
                  <th>کال</th>
                  <th>د کتابونو شمیر</th>
                </tr>
              </thead>
              <tbody>
                ${filteredStudents.length > 0 ? 
                  filteredStudents.map(student => `
                    <tr>
                      <td>${student.name}</td>
                      <td>${departmentName}</td>
                      <td>${student.id}</td>
                      <td>${student.year}</td>
                      <td class="${student.booksCheckedOut === 0 ? 'book-count-0' : 
                                   student.booksCheckedOut > 3 ? 'book-count-danger' : 'book-count-warning'}">
                        ${student.booksCheckedOut}
                      </td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td colspan="5" style="text-align: center;">هیڅ محصل ونه موندل شو</td>
                    </tr>
                  `}
              </tbody>
            </table>
            <div class="report-footer">
              د تولید نیټه: ${new Date().toLocaleDateString('fa-AF')} | مجموعه: ${filteredStudents.length} محصلین
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
      alert('د چاپ کړکۍ پرانیستلو کې ستونزه! لطفاً د پاپ اپ اجازه ورکړئ.');
    }
  };

  return (
    <div ref={reportRef} className="p-4 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">د محصلین راپور</h1>
        
        <div className="flex flex-wrap gap-4 mb-6 no-print">
          <div className="flex flex-col flex-1">
            <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">پوهنځی</label>
            <select 
              id="faculty" 
              onChange={handleFacultyChange}
              className="border rounded-md p-2"
              value={selectedFaculty?.id || ''}
            >
              <option value="">ټول پوهنځی</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">څانګه</label>
            <select 
              id="department" 
              onChange={handleDepartmentChange}
              className="border rounded-md p-2"
              value={selectedDepartment}
              disabled={!selectedFaculty}
            >
              <option value="">ټولې څانګې</option>
              {selectedFaculty?.departments.map((department) => (
                <option key={department.id} value={department.id.toString()}>{department.name}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">د محصلین معلومات ترلاسه کیږي...</div>
        ) : (
          <div className="overflow-x-auto print:overflow-visible">
            <table className="min-w-full divide-y divide-gray-200 print:table print:w-full">
              <thead className="bg-gray-50 print:bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">نوم</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">څانګه</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">د محصل ID</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">کال</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">د کتابونو شمیر</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 print:px-2 print:py-2 print:text-sm">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">
                        {selectedFaculty?.departments.find(d => d.id.toString() === student.department)?.name || student.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{student.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{student.year}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${student.booksCheckedOut === 0 ? 'bg-green-100 text-green-800 print:book-count-0' : 
                            student.booksCheckedOut > 3 ? 'bg-red-100 text-red-800 print:book-count-danger' : 
                            'bg-yellow-100 text-yellow-800 print:book-count-warning'}`}>
                          {student.booksCheckedOut}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 print:px-2 print:py-2">
                      {selectedDepartment ? 'هیڅ محصل ونه موندل شو' : 'د محصلین د لیدو لپاره یوه څانګه وټاکئ'}
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
            disabled={!selectedDepartment || filteredStudents.length === 0}
            className={`bg-blue-600 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 
              ${(!selectedDepartment || filteredStudents.length === 0) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            راپور چاپ کړئ
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentsReport;