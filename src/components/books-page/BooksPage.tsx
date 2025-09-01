import { useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import BookCard from "../books-section/BookCard";
import {
  useAddToShoppingCart,
  useNewgetCategoriesWithBooks,
} from "../../config/client/HomePgeApi.query";
import PDFViewerDialog from "../pdf/PDFViewerDialog";
import { showToast } from "../../utils/ShowToast";
import BookCardSkeleton from "../books-section/BookCardSkeleton";

const BookLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("title");
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfTitle, setPdfTitle] = useState<string>("");

  const { data: book, isPending } = useNewgetCategoriesWithBooks();
  const addToCardMutation = useAddToShoppingCart();

  const handleAddToCard = (bookId: string) => {
    addToCardMutation.mutate(bookId, {
      onSuccess: () =>
        showToast({
          description: "موفقانه به کارت افزورده شد",
          type: "success",
        }),
      onError: () =>
        showToast({ description: "خطا در افزودن به کارت", type: "error" }),
    });
  };

  const handlePdfClick = async (bookId: number, bookTitle: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/get/pdf/${bookId}`
      );
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setPdfUrl(blobUrl);
      setPdfTitle(bookTitle);
      setPdfDialogOpen(true);
    } catch (error) {
      showToast({ description: "خطا در بارگذاری PDF", type: "error" });
    }
  };

  const closePdfDialog = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfDialogOpen(false);
    setPdfUrl(null);
    setPdfTitle("");
  };

  if (isPending) return <BookCardSkeleton />;

  const categoriesWithBooks = book?.data.data || [];
  const categories = [
    "All",
    ...categoriesWithBooks.map((c: any) => c.category_name),
  ];
  const allBooks = categoriesWithBooks.flatMap((c: any) =>
    c.books.map((b: any) => ({ ...b, categoryName: c.category_name }))
  );

  const filteredBooks = allBooks.filter((b: any) => {
    const matchSearch =
      searchType === "title"
        ? b.title.toLowerCase().includes(searchTerm.toLowerCase())
        : searchType === "author"
        ? b.author.toLowerCase().includes(searchTerm.toLowerCase())
        : b.publicationYear?.toString().includes(searchTerm);

    const matchCategory =
      selectedCategory === "All" || b.categoryName === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 bg-gray-50 rounded-lg shadow-lg">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex gap-4 items-center w-full md:w-1/2">
          <Select value={searchType} onValueChange={setSearchType}>
            <SelectTrigger className="w-48 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-indigo-500">
              <SelectValue placeholder="نوع جستجو" />
            </SelectTrigger>
            <SelectContent>
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

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-1/3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-indigo-500">
            <SelectValue placeholder="دسته‌بندی‌ها" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((b: any) => (
            <BookCard
              key={b.id}
              book={b}
              onAddToCart={handleAddToCard}
              onReadPdf={handlePdfClick}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            کتابی یافت نشد.
          </p>
        )}
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
};

export default BookLibrary;
