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
  section: string;
  shelf: number;
  total_book: number;
  user_id: number;
}

const DashReservedBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const { token } = useAdminAuthStore();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/dashboard/reserves/books/in/reserve", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      setBooks(response.data.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      Swal.fire("Error", "Failed to fetch books", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleView = (id: number) => {
    const bookToView = books.find((book) => book.id === id);
    if (bookToView) {
      setSelectedBook(bookToView);
    }
  };


  const filteredBooks = books.filter((book) =>
    `${book.book_title} ${book.book_author}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          لیست کتابهای ثبت شده
        </h1>
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو..."
              className="bg-white border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
