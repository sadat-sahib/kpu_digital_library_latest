import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Eye, FileText } from "lucide-react";
import React from "react";
import {
  useAddToShoppingCard,
  useNewgetCategoriesWithBooks,
} from "../../config/client/HomePgeApi.query";
import { Card, CardContent } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { toast } from "../ui/use-toast";
import BookCardSkeleton from "./BookCardSkeleton";
import CustomImage from "../ui/custom-image/CustomImage";
import PDFViewerDialog from "../pdf/PDFViewerDialog";

interface CoursesCardsProps {
  isMobile?: boolean;
  categoryDocIds?: string[];
}

const CoursesCards = () => {
  //   // PDF functionality
  const [pdfDialogOpen, setPdfDialogOpen] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfTitle, setPdfTitle] = useState<string>("");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
    align: "start",
    skipSnaps: false,
  });
  const { data: book, isPending } = useNewgetCategoriesWithBooks();
  console.log("bbb", book);
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

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

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

  if (isPending) {
    return <BookCardSkeleton />;
  }
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
  // const categoriesWithBooks = data?.data.categories_with_books || [];

  return (
    <div className="relative py-6" dir="rtl">
      {/* عنوان بالای کارت‌ها */}
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
          {book?.data.data.map((category) =>
            category.books.map((book: any) => (
              <Card
                key={book.id}
                className="book-card shadow-md mx-auto w-[90%] sm:w-[150px] md:w-[180px] lg:w-[250px] flex-shrink-0"
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
                      {/* <Tooltip>
                        <TooltipTrigger
                          className={`${
                            book.format === "hard" ? "opacity-0" : "opacity-100"
                          }`}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePdfClick(book.pdf, book.title)}
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
                      </Tooltip> */}
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
          )}
        </div>
      </div>

      {/* لینک نمایش بیشتر */}
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
