import React, { useEffect, useState } from "react";
import axios from "../../../axiosInstance";
import { FaSearch } from "react-icons/fa";
import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";
import Pagination from "../pagination/pagination";
import Swal from "sweetalert2";
import { Loader } from "lucide-react";
import ReservedTable from "../bookTable/reservedTable";
import ReservedDetails from "../bookTable/reservedDetails";

interface Book {
  book_author: string;
  book_code: string;
  book_status: string;
  book_title: string;
  category: string;
  id: number;
  isbn: string;
  publicationYear: string;
  return_date: string;
  reserve_date: string;
  section: string;
  shelf: number;
  total_book: number;
  user_id: number;
  faculty?: string;
}

interface Faculty {
  id: number;
  name: string;
}

const DashReservedBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const { token } = useAdminAuthStore();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
    fetchFaculties();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/dashboard/reserves/books/in/reserve", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      Swal.fire("Error", "Failed to fetch books", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchFaculties = async () => {
    try {
      const response = await axios.get("/api/dashboard/faculties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Faculties: ", response.data.data);
      setFaculties(response.data.data);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  const handleView = (id: number) => {
    const bookToView = books.find((book) => book.id === id);
    if (bookToView) {
      setSelectedBook(bookToView);
    }
  };

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFaculty(e.target.value);
    setCurrentPage(1);
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = `${book.book_title} ${book.book_author}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    const matchesFaculty = selectedFaculty === "" || book.faculty === selectedFaculty;
    
    return matchesSearch && matchesFaculty;
  });

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedBook && (
        <ReservedDetails
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">لیست کتابهای ثبت شده</h1>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
          <div className="w-full md:w-48">
            <select
              value={selectedFaculty}
              onChange={handleFacultyChange}
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">همه دانشکده ها</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.name}>
                  {faculty.name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="جستجو..."
              className="w-full text-black bg-white border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader size={32} className="animate-spin text-blue-600" />
        </div>
      ) : (
        <>
          <ReservedTable
            books={currentBooks}
            onView={handleView}
          />
          <Pagination
            currentPage={currentPage}
            totalItems={filteredBooks.length}
            itemsPerPage={booksPerPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default DashReservedBooks;