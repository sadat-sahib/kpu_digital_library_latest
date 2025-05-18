import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import axios from '../../../axiosInstance';
import { sampleStudents, sampleBooks } from './data';
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

export interface Student {
  id: string;
  name: string;
  department: string;
  year: number;
  booksCheckedOut: number;
}

interface LibraryReportProps {
  books: Book[];
  students: Student[];
}

interface Faculty{
  id: number;
  name: string;
  departments: Department[];
}

interface Department{
  id: number;
  name: string;
}

const LibraryReport: React.FC<LibraryReportProps> = ({ books, students }) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [selectedFac, setSelectedFac] = useState<Faculty>();
  const [bookFilters, setBookFilters] = useState({
    type: '',
    status: ''
  });

  const [studentFilters, setStudentFilters] = useState({
    department: '',
    year: ''
  });

  const [activeTab, setActiveTab] = useState<'books' | 'students'>('books');

  // Apply filters to books
  const filteredBooks = books.filter(book => {
    return (
      (bookFilters.type === '' || book.type === bookFilters.type) &&
      (bookFilters.status === '' || book.status === bookFilters.status)
    );
  });

  // Apply filters to students
  const filteredStudents = students.filter(student => {
    return (
      (studentFilters.department === '' || student.department === studentFilters.department) &&
      (studentFilters.year === '' || student.year.toString() === studentFilters.year)
    );
  });

       // Setting department based on the faculty
       const handleDepartment = (e: ChangeEvent<HTMLSelectElement>) => {
           const facultyId = parseInt(e.target.value, 10);
           const selectedFaculty = faculties.find(faculty=> faculty.id === facultyId);
           console.log(selectedFaculty);
           setSelectedFac(selectedFaculty);
       };
       useEffect(()=>{
           axios.get("/api/home/faculties/with/departments").then((response)=>{
               setFaculties(response.data.data);
               console.log(response.data.data);
   
           });
       }, [])
  // Handle print
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && reportRef.current) {
      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Library Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
              h1 { color: #2c3e50; text-align: center; margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              th { background-color: #f8f9fa; text-align: left; padding: 8px; border: 1px solid #ddd; }
              td { padding: 8px; border: 1px solid #ddd; }
              .status-available { background-color: #d4edda; color: #155724; }
              .status-checked-out { background-color: #fff3cd; color: #856404; }
              .status-lost { background-color: #f8d7da; color: #721c24; }
              .status-reserved { background-color: #cce5ff; color: #004085; }
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
              <div class="filter-info">
                ${activeTab === 'books' ? 
                  `Book Filters: ${bookFilters.type ? 'Type: ' + bookFilters.type + '; ' : ''}${bookFilters.status ? 'Status: ' + bookFilters.status : ''}` : 
                  `Student Filters: ${studentFilters.department ? 'Department: ' + studentFilters.department + '; ' : ''}${studentFilters.year ? 'Year: ' + studentFilters.year : ''}`}
              </div>
            </div>
            
            ${activeTab === 'books' ? `
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  ${filteredBooks.map(book => `
                    <tr>
                      <td>${book.title}</td>
                      <td>${book.author}</td>
                      <td>${book.type.charAt(0).toUpperCase() + book.type.slice(1)}</td>
                      <td class="status-${book.status.replace('-', '')}">
                        ${book.status.charAt(0).toUpperCase() + book.status.slice(1).replace('-', ' ')}
                      </td>
                      <td>${book.dueDate || '-'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              <div class="report-footer">
                Generated on ${new Date().toLocaleDateString()} | Total: ${filteredBooks.length} books
              </div>
            ` : `
              <table>
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>Books Checked Out</th>
                  </tr>
                </thead>
                <tbody>
                  ${filteredStudents.map(student => `
                    <tr>
                      <td>${student.id}</td>
                      <td>${student.name}</td>
                      <td>${student.department}</td>
                      <td>${student.year}</td>
                      <td class="${student.booksCheckedOut === 0 ? 'book-count-0' : student.booksCheckedOut > 3 ? 'book-count-danger' : 'book-count-warning'}">
                        ${student.booksCheckedOut}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              <div class="report-footer">
                Generated on ${new Date().toLocaleDateString()} | Total: ${filteredStudents.length} students
              </div>
            `}
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
      alert('Could not open print window. Please allow popups for this site.');
    }
  };

  return (
    <div ref={reportRef} className="p-4 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Library Management Report</h1>
        
        {/* Tabs */}
        <div className="flex border-b mb-6 no-print">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'books' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('books')}
          >
            Books Report
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'students' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('students')}
          >
            Students Report
          </button>
        </div>

        {/* Book Report */}
        {activeTab === 'books' && (
          <div>
            <div className="flex flex-wrap gap-4 mb-6 no-print">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Book Type</label>
                <select
                  className="border rounded-md p-2"
                  value={bookFilters.type}
                  onChange={(e) => setBookFilters({...bookFilters, type: e.target.value})}
                >
                  <option value="">All Types</option>
                  <option value="textbook">Textbook</option>
                  <option value="reference">Reference</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="periodical">Periodical</option>
                </select>
              </div>

              <div className="flex flex-col">
                        <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">پوهنځی</label>
                        <select id="faculty" onChange={handleDepartment} className="input border rounded-md p-2">
                            <option value="">انتخاب پوهنځی</option>
                            {faculties && faculties.map((f, index) => (
                                <option key={index} value={f.id}>{f.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1"> دپارتمنت</label>
                        <select id="department" className="input border rounded-md p-2">
                        <option value="">انتخاب دیپارتمنت</option>
                            {selectedFac && selectedFac.departments.map((d, index) => (
                                <option key={index} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                    </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="border rounded-md p-2"
                  value={bookFilters.status}
                  onChange={(e) => setBookFilters({...bookFilters, status: e.target.value})}
                >
                  <option value="">All Statuses</option>
                  <option value="available">Available</option>
                  <option value="checked-out">Checked Out</option>
                  <option value="lost">Lost</option>
                  <option value="reserved">Reserved</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto print:overflow-visible">
              <table className="min-w-full divide-y divide-gray-200 print:table print:w-full">
                <thead className="bg-gray-50 print:bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">Title</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">Author</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">Type</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">Due Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                      <tr key={book.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 print:px-2 print:py-2 print:text-sm">{book.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{book.author}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize print:px-2 print:py-2 print:text-sm">{book.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize print:px-2 print:py-2 print:text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${book.status === 'available' ? 'bg-green-100 text-green-800 print:status-available' : 
                              book.status === 'checked-out' ? 'bg-yellow-100 text-yellow-800 print:status-checkedout' :
                              book.status === 'lost' ? 'bg-red-100 text-red-800 print:status-lost' : 'bg-blue-100 text-blue-800 print:status-reserved'}`}>
                            {book.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{book.dueDate || '-'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 print:px-2 print:py-2">No books found matching your filters</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Student Report */}
        {activeTab === 'students' && (
          <div>
            <div className="flex flex-wrap gap-4 mb-6 no-print">
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  className="border rounded-md p-2"
                  value={studentFilters.department}
                  onChange={(e) => setStudentFilters({...studentFilters, department: e.target.value})}
                >
                  <option value="">All Departments</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business">Business</option>
                  <option value="Arts">Arts</option>
                  <option value="Medicine">Medicine</option>
                </select>
              </div> */}
              <div className="flex flex-col">
                        <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">پوهنځی</label>
                        <select id="faculty" onChange={handleDepartment} className="input border rounded-md p-2">
                            <option value="">انتخاب پوهنځی</option>
                            {faculties && faculties.map((f, index) => (
                                <option key={index} value={f.id}>{f.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1"> دپارتمنت</label>
                        <select id="department" className="input border rounded-md p-2">
                        <option value="">انتخاب دیپارتمنت</option>
                            {selectedFac && selectedFac.departments.map((d, index) => (
                                <option key={index} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                    </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select
                  className="border rounded-md p-2"
                  value={studentFilters.year}
                  onChange={(e) => setStudentFilters({...studentFilters, year: e.target.value})}
                >
                  <option value="">All Years</option>
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option>
                  <option value="5">Fifth Year</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto print:overflow-visible">
              <table className="min-w-full divide-y divide-gray-200 print:table print:w-full">
                <thead className="bg-gray-50 print:bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">Name</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">Department</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">Student ID</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">Year</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:px-2 print:py-2 print:text-sm">Books Checked Out</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 print:px-2 print:py-2 print:text-sm">{student.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{student.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">{student.year}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 print:px-2 print:py-2 print:text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${student.booksCheckedOut === 0 ? 'bg-green-100 text-green-800 print:book-count-0' : 
                              student.booksCheckedOut > 3 ? 'bg-red-100 text-red-800 print:book-count-danger' : 'bg-yellow-100 text-yellow-800 print:book-count-warning'}`}>
                            {student.booksCheckedOut}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 print:px-2 print:py-2">No students found matching your filters</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Print Button */}
        <div className="mt-6 flex justify-end no-print">
          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            Print Report
          </button>
        </div>
      </div>
    </div>
  );
};


function Report() {
  return (
    <div className="p-4">
      <LibraryReport books={sampleBooks} students={sampleStudents} />
    </div>
  );
}

export default Report;