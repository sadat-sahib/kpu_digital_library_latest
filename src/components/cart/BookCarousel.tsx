
import React, { useState } from "react";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../axiosInstance";
import { useAuthStore } from "../../Store/useAuthStore";
import { useLibraryStore } from "../../Store/useLibraryInformation";
import { useCartStore } from "../../Store/useCartStore";
import BookCard from "./BookCard"; // Import the new BookCard component
import BookDetailsDialog from "./BookDetailDialog";
import PDFViewerDialog from "../pdf/PDFViewerDialog";
import { Book, Category } from "./Types";
import { AxiosError } from "axios";
import { Button } from "../ui/button";
import Swal from "sweetalert2";
import { useGetAllInformation, useGetCategoriesWithBooks, useReserveBooks } from "../../config/client/HomePgeApi.query";

// باقی کدهای قبلی شما بدون تغییر

export default function BookCategories() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleBooks, setVisibleBooks] = useState<{ [key: number]: number }>({});
  const [showAll, setShowAll] = useState<{ [key: number]: boolean }>({});
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  //   // PDF functionality
  const [pdfDialogOpen, setPdfDialogOpen] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfTitle, setPdfTitle] = useState<string>("");

  const { incrementCart } = useCartStore();
  const { setCategoriesNumBooks, setMainInformation } = useLibraryStore();

  
const {data:book } = useGetCategoriesWithBooks();

  // دریافت دسته‌بندی‌ها
  const { data: categories = [] } = useQuery<Category[], AxiosError>({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const res = await axios.get("/api/home");
      setCategoriesNumBooks(res.data.categories_num_books);
      setMainInformation(res.data.main_information);
      return res.data.categories_with_books;
    },
  });

  // دریافت کتاب‌های هر دسته‌بندی
  const booksQueries = useQueries({
    queries: categories.map((category: Category) => ({
      queryKey: ["books", category.id],
      queryFn: async () => {
        const res = await axios.get(`/api/categories/books/${category.id}`);
        return {
          categoryId: category.id,
          books: res.data.data.books.data as Book[],
        };
      },
      enabled: categories.length > 0,
    })),
  });

  const booksByCategory = booksQueries.reduce((acc, query) => {
    if (query.data) {
      acc[query.data.categoryId] = query.data.books;
    }
    return acc;
  }, {} as { [key: number]: Book[] });

    const { token } = useAuthStore();
  const queryClient = useQueryClient();
    const { mutate: addToCart } = useMutation<void, AxiosError, number>({
    mutationFn: async (id: number) => {
      await axios.post(
        `/api/cart/books/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "اضافه شد",
        text: "کتاب به کارت اضافه شد!",
        confirmButtonText: "بستن",
      });
      incrementCart();
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "دسترسی غیرمجاز",
          text: "لطفا برای ثبت درخواست‌تان ثبت‌نام نمایید یا وارد حساب‌تان شوید.",
          confirmButtonText: "ورود به حساب",
          showCancelButton: true,
          cancelButtonText: "بستن",
        }).then((result) => {
          if (result.isConfirmed) {
            // انتقال کاربر به صفحه ورود
            window.location.href = "/login";
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "خطا",
          text: "اضافه کردن کتاب به کارت با خطا مواجه شد!",
          confirmButtonText: "بستن",
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["cartBooks"],
      });
    },
  });


  const handleDialog = (book: Book) => {
    setSelectedBook(book);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const handlePdfClick = (pdfUrl: string, title: string) => {
    setPdfUrl(pdfUrl);
    setPdfTitle(title);
    setPdfDialogOpen(true);
  };
    const closePdfDialog = () => {
    setPdfDialogOpen(false);
    setPdfUrl(null);
    setPdfTitle("");
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleToggleShowAll = (categoryId: number, books: Book[]) => {
    setShowAll((prev) => {
      const isCurrentlyAll = prev[categoryId] ?? false;
      setVisibleBooks((prevBooks) => ({
        ...prevBooks,
        [categoryId]: isCurrentlyAll ? 5 : books.length,
      }));
      return { ...prev, [categoryId]: !isCurrentlyAll };
    });
  };

  return (
    <div>
      <div className="flex justify-end items-center px-8">
        <select onChange={handleCategoryChange} className="mb-4 p-2 border border-gray-300 rounded left-0">
          <option value="all">همه‌ی دسته‌بندی‌ها</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {categories
        .filter((category) =>
          selectedCategory === "all" ? true : category.id === +selectedCategory
        )
        .map((category) => {
          const books: Book[] = booksByCategory[category.id] || [];
          const visibleCount: number = visibleBooks[category.id] || 5;

          return (
            <div key={category.id}>
              <h2 className="text-lg font-bold mr-6">{category.name}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {books.slice(0, visibleCount).map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onDetailsClick={handleDialog}
                    onPdfClick={handlePdfClick}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
              {books.length > 5 && (
                <div className="flex justify-center mt-4">
                  <Button variant={'link'} className="text-blue-500 text-md" onClick={() => handleToggleShowAll(category.id, books)}>
                    {showAll[category.id] ? "دیدن کمتر" : "دیدن همه"}
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      {/* Dialogs */}
      {/* {openDialog && selectedBook && <BookDetailsDialog open={openDialog} onClose={closeDialog} book={selectedBook} />} */}
      {pdfDialogOpen && <PDFViewerDialog pdfUrl={pdfUrl} title={pdfTitle} onClose={closePdfDialog} />}
    </div>
  );
}
