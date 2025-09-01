import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import {
  useAddToShoppingCart,
  useGetBookDetailById,
} from "../../config/client/HomePgeApi.query";
import { toast } from "../ui/use-toast";
import CustomImage from "../ui/custom-image/CustomImage";
import { showToast } from "../../utils/ShowToast";
import DetailsSkeleton from "./BookDetailSkeleton";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: detail, isPending } = useGetBookDetailById(
    id ? Number(id) : undefined
  );

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

  if (isPending) {
    return (
      // <div className="flex justify-center items-center h-screen">
      //   Loading...
      // </div>
      <DetailsSkeleton/>
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
          <CustomImage
            src={detail?.data.data.image}
            alt={detail?.data.data.title}
            fallbackSrc="/no-image.png"
            width="100%"
            height={400}
            className="w-full max-w-md mx-auto"
            imgClassName="object-contain rounded-md"
          />
        </div>

        {/* Book Details */}
        <CardContent className="lg:w-1/2 w-full space-y-6">
          <h2 className="text-3xl font-extrabold text-gray-800">
            {detail?.data.data.title}
          </h2>

          <div className="space-y-2 text-gray-700 text-base">
            <p>
              <span className="font-semibold">نویسنده:</span>{" "}
              {detail?.data.data.author}
            </p>
            <p>
              <span className="font-semibold">ناشر:</span>{" "}
              {detail?.data.data.publisher}
            </p>
            <p>
              <span className="font-semibold">ویرایش:</span>{" "}
              {detail?.data.data.edition}
            </p>
            <p>
              <span className="font-semibold">نوعیت :</span>{" "}
              {detail?.data.data.format}
            </p>
            <p>
              <span className="font-semibold">مترجم:</span>{" "}
              {detail?.data.data.translator || "ندارد"}
            </p>
            <p>
              <span className="font-semibold">سال انتشار:</span>{" "}
              {detail?.data.data.publicationYear}
            </p>
          </div>

          {/* توضیحات */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">توضیحات:</h3>{" "}
            {/* اینو اضافه کردیم */}
            <div className="bg-gray-100 p-4 rounded-xl text-sm leading-relaxed text-gray-600">
              {detail?.data.data.description}
            </div>
          </div>

          <Button
            className="w-full lg:w-auto text-lg bg-blue-600 hover:bg-blue-700 font-medium"
            onClick={() => {
              const id = detail?.data.data.id;
              if (id !== undefined && id !== null) {
                handleAddToCard(String(id));
              }
            }}
          >
            افزودن به کارت <ShoppingCart />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
