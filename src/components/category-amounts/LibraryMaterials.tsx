// import { useState, useEffect } from "react";
// import { Book, BookA, BookAIcon, FileText, Library, User2 } from "lucide-react";
// import React from "react";
// import { useLibraryStore } from "../../Store/useLibraryInformation";

// interface Category {
//   id: number;
//   title: string;
//   icon: JSX.Element;
//   count: number;
// }

// export default function CategoryAmountsCart() {
//   const [isVisible, setIsVisible] = useState<boolean>(false);
//   const { mainInformation } = useLibraryStore();

//   // تمام هوک‌ها همیشه فراخوانی می‌شوند
//   useEffect(() => {
//     const timer = setTimeout(() => setIsVisible(true), 300);
//     return () => clearTimeout(timer);
//   }, []);

//   // اگر اطلاعات هنوز لود نشده باشند، آرایه دسته‌بندی را به عنوان آرایه خالی قرار می‌دهیم.
//   const categories: Category[] = mainInformation
//     ? [
//       {
//         id: 1,
//         title: "کل کتاب ها",
//         icon: <Library size={18} className="text-white" />,
//         count: mainInformation.all_books,
//       },
//         {
//           id: 2,
//           title: "کتاب های کتبی",
//           icon: <Book size={18} className="text-white" />,
//           count: mainInformation.hard_books,
//         },
//         {
//           id: 3,
//           title: "کتاب های سافت",
//           icon: <FileText size={18} className="text-white" />,
//           count: mainInformation.pdf_books,
//         },
 
//         {
//           id: 4,
//           title: "کتاب های قابل امانت",
//           icon: <BookA size={18} className="text-white" />,
//           count: mainInformation.all_borrowable_books,
//         },
//         {
//           id: 5,
//           title: "کتاب های قابل درخواست",
//           icon: <BookAIcon size={18} className="text-white" />,
//           count: mainInformation.all_reservable_books,
//         },
//         {
//           id: 6,
//           title: "کل کاربران",
//           icon: <User2 size={18} className="text-white" />,
//           count: mainInformation.all_registered_users,
//         },
//       ]
//     : [];

//   return (
//     <div className="py-8 px-4">
//       <h2 className="text-xl font-bold mb-6 text-center">اطلاعات کلی کتابخانه</h2>
//       {!mainInformation ? (
//         <p>در حال بارگذاری اطلاعات...</p>
//       ) : (
//         <div className="flex flex-wrap justify-center gap-4 ">
//           {categories.map((category, index) => (
//             <div
//               key={category.id}
//               className={`w-24 h-32 sm:w-28 sm:h-36 md:w-36 md:h-44 bg-gradient-to-t from-cyan-600 to-blue-500 text-white flex flex-col justify-center items-center rounded-lg shadow-lg transform transition-all duration-500 ${
//                 isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//               } hover:scale-110 hover:shadow-2xl`}
//               style={{ transitionDelay: `${index * 150}ms` }}
//             >
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-full flex items-center justify-center mb-3 transform transition-all duration-300 hover:rotate-12 hover:scale-105">
//                 {category.icon}
//               </div>
//               <p className="text-orange-400 text-lg font-bold">{category.count}</p>
//               <h3 className="text-sm font-medium mt-2 text-center">{category.title}</h3>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import { Card, CardContent } from "../ui/card";
import { BookOpen, BookCopy, BookMarked, Users } from "lucide-react";
import React from "react";
import { useGetCategoriesWithBooks } from "../../config/client/HomePgeApi.query";
import { Skeleton } from "../ui/skeleton";

export default function LibraryResources() {
  const { data, isPending } = useGetCategoriesWithBooks();
  
  // چک کردن برای بارگذاری
  if (isPending) {
    return (
<section className="w-full py-10 px-4 md:px-12 bg-muted">
  <div className="max-w-7xl mx-auto text-center">
    {/* اسکلیتون برای عنوان بخش */}
    <Skeleton className="text-2xl md:text-3xl font-bold mb-4 text-primary w-48 mx-auto h-5" />

    {/* اسکلیتون برای توضیحات */}
    <Skeleton className="text-muted-foreground mb-8 max-w-2xl mx-auto text-sm md:text-base h-4 w-3/4" />

    {/* اسکلیتون برای کارت‌ها */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="w-full">
          {/* اسکلیتون برای کارت */}
          <Skeleton className="w-full h-40 bg-gray-300 animate-pulse rounded-lg">
            {/* اسکلیتون برای آیکون */}
            <Skeleton className="w-16 h-16 bg-gray-400 animate-pulse rounded-full mx-auto mt-6" />

            {/* اسکلیتون برای عنوان */}
            <Skeleton className="h-6 w-3/4 bg-gray-400 animate-pulse rounded mt-4 mx-auto" />

            {/* اسکلیتون برای توضیحات */}
            <Skeleton className="h-4 w-1/2 bg-gray-400 animate-pulse rounded mt-2 mx-auto" />
          </Skeleton>
        </div>
      ))}
    </div>
  </div>
</section>


    );
  }

  // استخراج اطلاعات از main_information
  const mainInfo = data?.data.main_information || {};

  const resources = [
    {
      icon: <BookOpen className="w-6 h-6 text-yellow-500" />,
      title: "کتاب‌های کتبی",
      description: mainInfo.hard_books || "0",
    },
    {
      icon: <BookCopy className="w-6 h-6 text-purple-500" />,
      title: "کتاب‌های الکترونیکی",
      description: mainInfo.pdf_books || "0",
    },
    {
      icon: <BookMarked className="w-6 h-6 text-green-500" />,
      title: "کتاب های قابل امانت",
      description: mainInfo.all_borrowable_books || "0",
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "کاربران",
      description: mainInfo.all_registered_users || "0",
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
                <div className="bg-muted p-3 rounded-full mb-3">
                  {item.icon}
                </div>
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
