import React, { useEffect, useState } from "react";
import { Sheet, SheetContent } from "../ui/sheet";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { toast } from "../ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useCartStore } from "../../Store/useCartStore";

import { Trash } from "lucide-react";
import {
  useDeleteFromShoppingCart,
  useGetShoppingCartInfo,
  useReserveBooks,
} from "../../config/client/HomePgeApi.query";
import CustomImage from "../ui/custom-image/CustomImage";
import CardSkeleton from "./ShoppingCardSkeleton";
import { showToast } from "../../utils/ShowToast";


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

  const { data, isPending, isError } = useGetShoppingCartInfo();
  const deleteMutation = useDeleteFromShoppingCart();
  const reservMutation = useReserveBooks();

  useEffect(() => {
    if (cartCount !== data?.data.data.length) {
      setCartCount(data?.data.data.length);
    }
  }, [data?.data.data.length, cartCount, setCartCount]);
  const handleDelete = (bookId: string) => {
    deleteMutation.mutate(bookId, {
      onSuccess: () =>
        showToast({ description: "کتاب با موفقیت حذف شد.", type: "success" }),
      onError: () =>
        showToast({
          description: "در حذف کتاب مشکلی پیش آمده است.",
          type: "error",
        }),
    });
  };

  const queryClient = useQueryClient();
  const handleReserve = (bookId: string) => {
    reservMutation.mutate(bookId, {
      onSuccess: () => {
        showToast({
          description: "موفقانه به کارت افزورده شد",
          type: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
      },
      onError: () =>
        showToast({ description: "خطا در افزودن به کارت", type: "error" }),
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[300px] sm:w-[400px] md:w-[500px] max-h-screen overflow-y-auto">
        <div className="p-4 flex flex-col space-y-4">
          {isPending ? (
            <CardSkeleton />
          ) : isError ? (
            <div className="text-center text-red-500">
              خطا در بارگذاری اطلاعات سبد !
            </div>
          ) : data.data.data.length === 0 ? (
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
                        ثبت درخواست
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
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartSheet;
