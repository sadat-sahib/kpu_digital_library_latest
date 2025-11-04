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
  // const { token } = useAdminAuthStore();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
    fetchFaculties();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/dashboard/reserves/books/in/reserve", {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        withCredentials: true
      });
      setBooks(response.data.data);
      console.log('reserved-books',response)
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
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        withCredentials: true
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

        <>
          <ReservedTable
            books={currentBooks}
            onView={handleView}
            loading={loading}
          />
        </>
    
    </div>
  );
};

export default DashReservedBooks;