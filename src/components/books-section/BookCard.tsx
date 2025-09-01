import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Eye, FileText } from "lucide-react";
import CustomImage from "../ui/custom-image/CustomImage";

interface BookCardProps {
  book: any;
  onAddToCart: (bookId: string) => void;
  onReadPdf: (bookId: number, bookTitle: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart, onReadPdf }) => {
  return (
    <Card className="book-card shadow-md mx-auto w-[90%] sm:w-[150px] md:w-[180px] lg:w-[250px] flex-shrink-0">
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
              <TooltipTrigger className={`${book.format === "hard" ? "opacity-0" : "opacity-100"}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onReadPdf(book.id, book.title)}
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
          className="w-full mt-4 text-xs bg-blue-600 text-white hover:bg-blue-500 hover:text-white"
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
