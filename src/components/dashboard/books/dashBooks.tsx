import React, { useEffect, useState } from "react";
import axios from "../../../axiosInstance";
import BookTable from "../bookTable/bookTable";
import BookDetails from "../bookTable/bookDetails";
import Swal from "sweetalert2";
import DashBookRegistration from "./dashBookRegistration";


interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  publicationYear: string;
  department: string;
  description: string;
  edition: number;
  faculty: string;
  isbn: string;
  translator: string;
  lang: string;
  borrow: string;
  category: string;
  code: string;
  shelf: number;
  stock: {
    total: number;
    remain: number;
    status: string;
  };
}

interface Faculty {
  id: number;
  name: string;
}

const DashBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);
  // const { token } = useAdminAuthStore();
  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
    fetchFaculties();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/dashboard/books", {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        withCredentials: true,
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
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        withCredentials: true
      });
      // console.log("Faculties: ", response.data.data);
      setFaculties(response.data.data);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  const handleEdit = async (id: number) => {
    setEditingBookId(id);
  };

  const handleView = (id: number) => {
    const bookToView = books.find((book) => book.id === id);
    if (bookToView) {
      setSelectedBook(bookToView);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "آیا مطمعن هستید؟",
        text: "دیتای هذف شده قابل بازیافت نمیباشد!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "نخیر",
        confirmButtonText: "بلی",
      });

      if (result.isConfirmed) {
        setLoadingDelete(id);
        await axios.delete(`/api/dashboard/books/${id}`, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          withCredentials: true
        });
        setBooks(books.filter((book) => book.id !== id));
        Swal.fire("حذف شد", "موفقانه حذف گردید.", "success");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      Swal.fire("Error", "Failed to delete book", "error");
    } finally {
      setLoadingDelete(null);
    }
  };

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFaculty(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = `${book.title} ${book.author} ${book.publisher}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFaculty =
      selectedFaculty === "" || book.faculty === selectedFaculty;

    return matchesSearch && matchesFaculty;
  });

  if (editingBookId !== null) {
    return <DashBookRegistration bookId={editingBookId} />;
  }

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

 

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedBook && (
        <BookDetails
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}

      <>
        <BookTable
          books={currentBooks}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
          loadingDelete={loadingDelete}
          loading={loading}
        />
      </>
    </div>
  );
};

export default DashBooks;
