

import { Card, CardContent } from "../ui/card";
import { BookOpen, BookCopy, BookMarked, Users } from "lucide-react";
import React from "react";
import { useGetAllInformation } from "../../config/client/HomePgeApi.query";
import { Skeleton } from "../ui/skeleton";

export default function LibraryResources() {
  const { data: info, isPending } = useGetAllInformation();
  console.log("library info", info);

  // چک کردن برای بارگذاری
  if (isPending) {
    return (
      <section className="w-full py-10 px-4 md:px-12 bg-muted">
        <div className="max-w-7xl mx-auto text-center">
          <Skeleton className="text-2xl md:text-3xl font-bold mb-4 text-primary w-48 mx-auto h-5" />
          <Skeleton className="text-muted-foreground mb-8 max-w-2xl mx-auto text-sm md:text-base h-4 w-3/4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="w-full">
                <Skeleton className="w-full h-40 bg-gray-200 animate-pulse rounded-lg py-0.5">
                  <Skeleton className="w-16 h-16 bg-gray-300 animate-pulse rounded-full mx-auto mt-4" />
                  <Skeleton className="h-6 w-3/4 bg-gray-300 animate-pulse rounded mt-4 mx-auto" />
                  <Skeleton className="h-4 w-1/2 bg-gray-300 animate-pulse rounded mt-2 mx-auto" />
                </Skeleton>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // چک کردن وجود اطلاعات
  const information = info?.data?.counts;

  if (!information) {
    return (
      <section className="w-full py-10 px-4 md:px-12 bg-muted">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-1 text-primary">
            منابع کتابخانه
          </h2>
          <div className="mx-auto w-28 h-1 bg-blue-500 rounded"></div>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-sm md:text-base mt-4">
            کتابخانه دیجیتال دانشگاه، منابع فیزیکی و الکترونیکی متنوعی را در اختیار دانشجویان و پژوهشگران قرار می‌دهد.
          </p>
          <div className="text-muted-foreground text-center mt-6">
            اطلاعاتی برای نمایش وجود ندارد.
          </div>
        </div>
      </section>
    );
  }

  const resources = [
    {
      icon: <BookOpen className="w-6 h-6 text-yellow-500" />,
      title: "کتاب‌های کتبی",
      description: information.hard_books || "0",
    },
    {
      icon: <BookCopy className="w-6 h-6 text-purple-500" />,
      title: "کتاب‌های الکترونیکی",
      description: information.pdf_books || "0",
    },
    {
      icon: <BookMarked className="w-6 h-6 text-green-500" />,
      title: "کتاب های قابل امانت",
      description: information.all_barrowable_books || "0",
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "کاربران",
      description: information.all_registered_users || "0",
    },
  ];

  return (
    <section className="w-full py-10 px-4 md:px-12 bg-muted">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-1 text-primary">
          منابع کتابخانه
        </h2>
        <div className="mx-auto w-28 h-1 bg-blue-500 rounded"></div>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-sm md:text-base mt-4">
          کتابخانه دیجیتال دانشگاه، منابع فیزیکی و الکترونیکی متنوعی را در اختیار دانشجویان و پژوهشگران قرار می‌دهد.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((item, index) => (
            <Card key={index} className="hover:shadow-md transition-all duration-300">
              <CardContent className="flex flex-col items-center text-center py-4 px-4">
                <div className="bg-muted p-3 rounded-full mb-3">{item.icon}</div>
                <h3 className="font-semibold text-base text-primary mb-1">{item.title}</h3>
                <p className="text-md text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
