import { useState } from "react";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Link } from "react-router-dom";
import { Eye, FileText } from "lucide-react";
import {
  useAddToShoppingCard,
  useNewgetCategoriesWithBooks,
} from "../../config/client/HomePgeApi.query";
import { toast } from "../ui/use-toast";
import BookCardSkeleton from "../books-section/BookCardSkeleton";
import SearchFilterSkeleton from "./SearchFilterSkeleton";
import CustomImage from "../ui/custom-image/CustomImage";
import axios from "axios";
import PDFViewerDialog from "../pdf/PDFViewerDialog";

export default function BookLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("title");
  const [pdfDialogOpen, setPdfDialogOpen] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfTitle, setPdfTitle] = useState<string>("");
  const { data: book, isPending } = useNewgetCategoriesWithBooks();
  console.log("catwithBook", book);
  // const { data, isPending } = useGetCategoriesWithBooks();
  const addToCardMutation = useAddToShoppingCard();

  const handleAddToCard = (bookId: string) => {
    addToCardMutation.mutate(bookId, {
      onSuccess: () => {
        toast({
          title: "موفقیت آمیز!",
          description: "موفقانه به کارت افزورده شد",
          duration: 2000,
          className:
            "bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold",
        });
      },
      onError: () => {
        toast({
          title: "خطا!",
          description: "خطا در افزودن به کارت",
          duration: 2000,
          className:
            "bg-red-100 text-red-800 border border-red-300 font-semibold",
        });
      },
    });
  };
  if (isPending) {
    return <SearchFilterSkeleton />;
  }
  const categoriesWithBooks = book?.data.data || [];
  const categories = [
    "All",
    ...categoriesWithBooks.map((cat: any) => cat.category_name),
  ];
  const allBooks = categoriesWithBooks.flatMap((category: any) =>
    category.books.map((book: any) => ({
      ...book,
      categoryName: category.category_name, // برای فیلتر شدن
    }))
  );

  // const catWithBook = book?.data;
  // const categoriesWithBooks = data?.data.categories_with_books || [];

  // لیست کتگوری‌ها: نام کتگوری‌ها از ای پی آی
  // const categories = ["All", ...categoriesWithBooks.map((cat: any) => cat.name)];
  //  const categories = ["All", book?.data.data.map((cat: any) => cat.name)];
  // تمام کتاب‌ها از همه کتگوری‌ها
  // const allBooks = categoriesWithBooks.flatMap((category: any) =>
  //   category.books?.data.map((book: any) => ({
  //     ...book,
  //     categoryName: category.name, // برای فیلتر راحت
  //   }))
  // );

  const filteredBooks = (allBooks || []).filter((book) => {
    let matchSearch = false;

    if (searchType === "title") {
      matchSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchType === "author") {
      matchSearch = book.author
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    } else if (searchType === "year") {
      matchSearch = book.publicationYear?.toString().includes(searchTerm);
    }

    const matchCategory =
      selectedCategory === "All" || book.categoryName === selectedCategory;

    return matchSearch && matchCategory;
  });

  const handlePdfClick = async (bookId: number, bookTitle: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/get/pdf/${bookId}`,
        {
          responseType: "blob", // This is crucial for handling binary data
        }
      );

      // Create a Blob URL from the response
      const blob = new Blob([response.data], { type: "application/pdf" });
      const blobUrl = URL.createObjectURL(blob);

      setPdfUrl(blobUrl);
      setPdfTitle(bookTitle);
      setPdfDialogOpen(true);
    } catch (error) {
      console.error("خطا در گرفتن PDF:", error);
      toast({
        title: "خطا!",
        description: "خطا در بارگذاری PDF",
        duration: 2000,
        className:
          "bg-red-100 text-red-800 border border-red-300 font-semibold",
      });
    }
  };

  const closePdfDialog = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl); // Free the blob URL
    }
    setPdfDialogOpen(false);
    setPdfUrl(null);
    setPdfTitle("");
  };

  if (isPending) {
    return <BookCardSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 bg-gray-50 rounded-lg shadow-lg">
      {/* Search bar and search type select */}
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search bar */}
        <div className="flex gap-4 items-center w-full md:w-1/2">
          <Select
            value={searchType}
            onValueChange={(value) => setSearchType(value)}
          >
            <SelectTrigger className="w-48 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-indigo-500">
              <SelectValue placeholder="نوع جستجو" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg rounded-lg border border-gray-300">
              <SelectItem value="title">عنوان کتاب</SelectItem>
              <SelectItem value="author">نویسنده</SelectItem>
              <SelectItem value="year">سال انتشار</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="text"
            placeholder="جستجو ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-1/2 p-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Categories Dropdown */}
        <div className="w-full md:w-1/3">
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg shadow-sm hover:border-indigo-500">
              <SelectValue placeholder="دسته‌بندی‌ها" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg rounded-lg border border-gray-300">
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Book Cards */}
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book: any) => (
              <Card
                key={book.id}
                className="book-card shadow-lg mx-auto w-[90%] sm:w-[150px] md:w-[180px] lg:w-[250px] flex-shrink-0"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-t-md">
                  <CustomImage
                    src={book.image}
                    alt={book.title}
                    fallbackSrc="/no-image.png"
                    width="100%"
                    height="100%"
                    className="object-cover w-full h-full"
                    imgClassName="rounded-t-md"
                  />
                </div>
                <CardContent>
                  <div className="flex justify-center items-center py-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link to={`/book-details/${book.id}`}>
                            <Eye size={16} />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-100 text-gray-800 rounded-md p-2">
                          <p>جزییات</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger
                          className={`${
                            book.format === "hard" ? "opacity-0" : "opacity-100"
                          }`}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePdfClick(book.id, book.title)}
                            disabled={book.format === "hard"}
                          >
                            <FileText size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          className={`${
                            book.format === "hard" ? "opacity-0" : "opacity-100"
                          }`}
                        >
                          <p>خواندن</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      نویسنده : {book.author}
                    </p>
                  </div>
                  <Button
                    className="w-full mt-4 text-xs bg-blue-600 text-white hover:bg-blue-500 hover:text-white"
                    variant="outline"
                    onClick={() => handleAddToCard(book.id)}
                  >
                    افزودن به کارت
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500">کتابی یافت نشد.</p>
          )}
        </div>
      </div>
      {pdfDialogOpen && (
        <PDFViewerDialog
          pdfUrl={pdfUrl}
          title={pdfTitle}
          onClose={closePdfDialog}
        />
      )}
    </div>
  );
}
