// components/BookCard.tsx
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../../components/ui/tooltip";
import { Download, Eye, FileText } from "lucide-react";
import { Book } from "./Types";
import { useCartStore } from "../../Store/useCartStore";
import Swal from "sweetalert2";

interface BookCardProps {
  book: Book;
  onDetailsClick: (book: Book) => void;
  onPdfClick: (pdfUrl: string, title: string) => void;
  onAddToCart: (bookId: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onDetailsClick, onPdfClick, onAddToCart }) => {
  const { incrementCart } = useCartStore();

  return (
    <Card className="book-card shadow-lg mx-auto w-[90%] sm:w-[150px] md:w-[180px] lg:w-[230px] flex-shrink-0">
      <div className="relative h-48 w-full overflow-hidden rounded-t-md">
        <img
          src={book.image && "/3.jpg"}
          alt={book.title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent>
        <div className="flex justify-between items-center py-2">
        <TooltipProvider  >
          <Tooltip>
            <TooltipTrigger className={`${book.format === "hard" ? "opacity-0" : "opacity-100"}`}>
              <Button variant="ghost" size="sm" disabled={book.format === "hard"}>
                <Download size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent className={`${book.format === "hard" ? "opacity-0" : "opacity-100"}`}>
              <p>دانلود</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="sm" onClick={() => onDetailsClick(book)}>
                <Eye size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>جزییات</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger className={`${book.format === "hard" ? "opacity-0" : "opacity-100"}`}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPdfClick(book.pdf, book.title)}
                disabled={book.format === "hard"}
              >
                <FileText size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent className={`${book.format === "hard" ? "opacity-0" : "opacity-100"}`}>
              <p>خواندن</p>
            </TooltipContent>
          </Tooltip>
          </TooltipProvider>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{book.title}</h3>
          <p className="text-xs text-gray-500">نویسنده : {book.author}</p>
        </div>
        <Button
          className="w-full mt-4 text-xs"
          variant="outline"
          onClick={() => onAddToCart(book.id)}
        >
          افزودن به کارت
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookCard;
