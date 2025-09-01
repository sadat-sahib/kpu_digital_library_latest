import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import {
  useAddToShoppingCart,
  useNewgetCategoriesWithBooks,
} from "../../config/client/HomePgeApi.query";
import { showToast } from "../../utils/ShowToast";
import PDFViewerDialog from "../pdf/PDFViewerDialog";
import BookCardSkeleton from "./BookCardSkeleton";
import axios from "axios";

const CoursesCards = () => {
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
      const response = await axios.get(
        `http://localhost:8000/api/get/pdf/${bookId}`,
        { responseType: "blob" }
      );
      const blobUrl = URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      setPdfUrl(blobUrl);
      setPdfTitle(bookTitle);
      setPdfDialogOpen(true);
    } catch (error) {
      console.error(error);
      showToast({ description: "خطا در بارگذاری PDF", type: "error" });
    }
  };

  const closePdfDialog = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfDialogOpen(false);
    setPdfUrl(null);
    setPdfTitle("");
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
    align: "start",
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  if (isPending) return <BookCardSkeleton />;

  return (
    <div className="relative py-6" dir="rtl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">کتاب ها</h2>
        <div className="mx-auto w-24 h-1 bg-blue-500 rounded"></div>
      </div>
      {/* دکمه چپ */}
      <div className="absolute left-0 top-1/2 z-10 flex -translate-y-1/2 items-center">
        <button
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          className={`swiper-button-prev-custom flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 p-2 text-3xl text-black shadow-md dark:bg-default-400 dark:text-white ${
            prevBtnDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ChevronLeft size={27} />
        </button>
      </div>
       {/* دکمه راست */}
      <div className="absolute right-0 top-1/2 z-10 flex -translate-y-1/2 items-center">
        <button
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          className={`swiper-button-next-custom flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 p-2 text-3xl text-black shadow-md dark:bg-default-400 dark:text-white ${
            nextBtnDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ChevronRight size={27} />
        </button>
      </div>
      {/* Carousel */}
      <div className="lg:px-6 overflow-hidden" ref={emblaRef}>
        <div className="flex flex-row-reverse gap-4 py-4">
          {book?.data.data.map((category: any) =>
            category.books.map((b: any) => (
              <BookCard
                key={b.id}
                book={b}
                onAddToCart={handleAddToCard}
                onReadPdf={handlePdfClick}
              />
            ))
          )}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Link
          to="/books"
          className="text-blue-600 hover:underline font-semibold text-sm"
        >
          نمایش همه کتاب‌ها
        </Link>
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

export default CoursesCards;
