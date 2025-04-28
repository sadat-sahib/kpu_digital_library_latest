import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react"; 
import { useParams, Link } from "react-router-dom"; 
import { useAddToShoppingCard, useGetCategoriesWithBooks } from "../../config/client/HomePgeApi.query";
import { toast } from "../../@/hooks/use-toast";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isPending } = useGetCategoriesWithBooks();
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
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const categoriesWithBooks = data?.data.categories_with_books || [];

  const book = categoriesWithBooks
    .flatMap((category) => category.books.data)
    .find((book) => book.id.toString() === id);

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen">
        کتاب پیدا نشد!
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      {/* دکمه بازگشت */}
      <div className="mb-6 flex justify-end">
        <Link
          to={"/"}
          className="flex items-center gap-2   px-4 py-2 rounded-xl bg-violet-100 text-blue-600 font-medium transition hover:bg-violet-200"
        >
          <ArrowLeft size={20} />
          بازگشت به کتاب‌ها
        </Link>
      </div>

      <Card className="flex flex-col lg:flex-row gap-8 p-6 border-none ">
        {/* Book Image */}
        <div className="lg:w-1/2 w-full flex justify-center items-start">
          <img
            src={book.image && "/3.jpg"}
            alt="Book Cover"
            className="w-full max-w-sm rounded-sm shadow-lg object-cover"
          />
        </div>

        {/* Book Details */}
        <CardContent className="lg:w-1/2 w-full space-y-6">
          <h2 className="text-3xl font-extrabold text-gray-800">
            {book.title}
          </h2>

          <div className="space-y-2 text-gray-700 text-base">
            <p>
              <span className="font-semibold">نویسنده:</span> {book.author}
            </p>
            <p>
              <span className="font-semibold">ناشر:</span> {book.publisher}
            </p>
            <p>
              <span className="font-semibold">ویرایش:</span> {book.edition}
            </p>
            <p>
              <span className="font-semibold">نوعیت :</span> {book.format}
            </p>
            <p>
              <span className="font-semibold">مترجم:</span>{" "}
              {book.translator || "ندارد"}
            </p>
            <p>
              <span className="font-semibold">سال انتشار:</span>{" "}
              {book.publicationYear}
            </p>
          </div>

          {/* توضیحات */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">توضیحات:</h3>{" "}
            {/* اینو اضافه کردیم */}
            <div className="bg-gray-100 p-4 rounded-xl text-sm leading-relaxed text-gray-600">
              {book.description}
            </div>
          </div>

          <Button className="w-full lg:w-auto text-lg bg-blue-600 hover:bg-blue-700 font-medium"
          onClick={() => handleAddToCard(book.id)}>
            افزودن به کارت <ShoppingCart />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
