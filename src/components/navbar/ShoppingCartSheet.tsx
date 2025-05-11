

import React, { useEffect } from "react";
import { Sheet, SheetContent } from "../ui/sheet";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { toast } from "../../@/hooks/use-toast";

import { useCartStore } from "../../Store/useCartStore";

import { Trash } from "lucide-react";
import {
  useDeleteFromShoppingCard,
  useGetShoppingCardInfo,
  useReserveBooks,
} from "../../config/client/HomePgeApi.query";
import CustomImage from "../ui/custom-image/CustomImage";
import CardSkeleton from "./ShoppingCardSkeleton";

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
const ShoppingCartSheet: React.FC<ShoppingCartSheetProps> = ({
  open,
  onOpenChange,
}) => {
  const { cartCount, setCartCount, decrementCart } = useCartStore();

  const { data, isPending, isError } = useGetShoppingCardInfo();
  const deleteMutation = useDeleteFromShoppingCard();
  const reservMutation = useReserveBooks();

  useEffect(() => {
    if (cartCount !== data?.data.data.length) {
      setCartCount(data?.data.data.length);
    }
  }, [data?.data.data.length, cartCount, setCartCount]);

  const handleDelete = (bookId: string) => {
    deleteMutation.mutate(bookId, {
      onSuccess: () => {
        decrementCart();
        toast({
          title: "موفقیت‌آمیز!",
          description: "کتاب با موفقیت حذف شد.",
          className:
            "bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold",
          duration: 2000,
        });
      },
      onError: () => {
        toast({
          title: "خطا!",
          description: "در حذف کتاب مشکلی پیش آمده است.",
          className:
            "bg-red-100 text-red-800 border border-red-300 font-semibold",
          duration: 2000,
        });
      },
    });
  };

  const handleReserve = (bookId: string) => {
    reservMutation.mutate(bookId, {
      onSuccess: () => {
        toast({
          title: "موفقیت آمیز!",
          description: "درخواست با موفقیت ثبت شد ",
          duration: 2000,
          className:
            "bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold",
        });
      },
      onError: () => {
        toast({
          title: "خطا!",
          description: "خطا در ثبت درخواست",
          duration: 2000,
          className:
            "bg-red-100 text-red-800 border border-red-300 font-semibold",
        });
      },
    });
  };


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[300px] sm:w-[400px] md:w-[500px] max-h-screen overflow-y-auto">
        <div className="p-4 flex flex-col space-y-4">
          {
            isPending ? (
              <CardSkeleton />
            ) : isError ? (
              <div className="text-center text-red-500">
                خطا در بارگذاری اطلاعات سبد !
              </div>
            ) :(
          
          data.data.length === 0 ? (
            <div className="text-center text-gray-500">سبد شما خالی است.</div>
          ) : (
            <div className="flex flex-col space-y-4">
              {data.data.data.map((book: Book) => (
                <Card
                  key={book.id}
                  className="shadow-lg w-full max-w-[250px] mx-auto"
                >
                  <div className="relative h-40 w-full overflow-hidden rounded-t-md">
                    <CustomImage
                      src={book.image_url}
                      alt={book.title}
                      fallbackSrc="/no-image.png"
                      width="100%"
                      height="100%"
                      className="object-cover w-full h-full"
                      imgClassName="rounded-t-md"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h3 className="text-base font-semibold mb-2 text-center">
                      {book.title}
                    </h3>
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-3">
                      <Button
                        variant="outline"
                        className="flex items-center justify-center w-full md:w-24 text-sm px-4 py-2"
                        onClick={() => handleReserve(book.id)}
                      >
                        {reservMutation.isPending
                          ? "در حال ثبت.."
                          : "ثبت درخواست"}
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex items-center justify-center w-full md:w-24 text-sm px-4 py-2"
                        onClick={() => handleDelete(book.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" /> حذف
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartSheet;
