import React, { useEffect } from "react";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "../../axiosInstance";
import { Sheet, SheetContent } from "../ui/sheet";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useAuthStore } from "../../Store/useAuthStore";
import { useCartStore } from "../../Store/useCartStore";
import Swal from "sweetalert2";
import { Trash } from "lucide-react";

interface ShoppingCartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Book {
  id: string;
  title: string;
  author: string;
  image_url: string;
  publicationYear: string;
  publisher: string;
  translator: string;
}
const ShoppingCartSheet: React.FC<ShoppingCartSheetProps> = ({ open, onOpenChange }) => {
  const { token } = useAuthStore();
  const { cartCount, setCartCount, decrementCart } = useCartStore();

  const { data: books = [], isLoading, isError, refetch } = useQuery<Book[], Error>({
    queryKey: ["cartBooks"],
    queryFn: async () => {
      const response = await axios.get("/api/cart/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    },
    onSuccess: (data: Book[]) => {
      setCartCount(data.length); // مقداردهی تعداد آیتم‌ها در سبد خرید
    },
    refetchOnMount: true, // ری‌فیچ هنگام mount شدن کامپوننت
    refetchOnWindowFocus: true, // ری‌فیچ هنگام بازگشت به صفحه
    refetchInterval: 5000, // ری‌فیچ هر 5 ثانیه
  } as UseQueryOptions<Book[], Error>);

  useEffect(() => {
    if (cartCount !== books.length) {
      setCartCount(books.length);
    }
  }, [books, cartCount, setCartCount]);

  const handleDelete = async (bookId: string) => {
    try {
      await axios.delete(`/api/cart/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "حذف شد!",
        text: "کتاب با موفقیت حذف شد.",
        confirmButtonText: "بستن",
      });
      decrementCart();
      refetch(); // ری‌فیچ پس از حذف کتاب
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطا!",
        text: "مشکلی در حذف کتاب پیش آمده است.",
        confirmButtonText: "بستن",
      });
      console.error(error);
    }
  };

  const handleReserveRequest = async (bookId: string) => {
    try {
      await axios.post(
        `/api/reserve/books/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "درخواست ثبت شد!",
        text: "درخواست شما برای رزرو کتاب با موفقیت ثبت شد.",
        confirmButtonText: "بستن",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطا!",
        text: "مشکلی در ثبت درخواست پیش آمده است.",
        confirmButtonText: "بسستن",
      });
      console.error(error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[300px] sm:w-[400px] md:w-[500px] max-h-screen overflow-y-auto">
        <div className="p-4 flex flex-col space-y-4">
          {isLoading ? (
            <div className="text-center">در حال بارگذاری...</div>
          ) : isError ? (
            <div className="text-center text-red-500">خطا در بارگذاری اطلاعات سبد !</div>
          ) : books.length === 0 ? (
            <div className="text-center text-gray-500">سبد شما خالی است.</div>
          ) : (
            <div className="flex flex-col space-y-4">
              {books.map((book: Book) => (
                <Card key={book.id} className="shadow-lg w-full max-w-[250px] mx-auto">
                  <div className="relative h-40 w-full overflow-hidden rounded-t-md">
                    <img
                      src={book.image_url}
                      alt={book.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h3 className="text-base font-semibold mb-2 text-center">{book.title}</h3>
                    <div className="flex justify-between mb-3">
                      <Button
                        variant="outline"
                        className="flex items-center justify-center w-24 text-sm px-4 py-2"
                        onClick={() => handleReserveRequest(book.id)}
                      >
                        ثبت درخواست
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex items-center justify-center w-24 text-sm px-4 py-2"
                        onClick={() => handleDelete(book.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" /> حذف
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartSheet;