// import { useState, useEffect } from "react";
// import { Card, CardContent } from "../ui/card";
// import React from "react";
// import { useLibraryStore } from "../../Store/useLibraryInformation";
// import { Button } from "../ui/button";

// export default function CategoryAmountsCart() {
//   const [isVisible, setIsVisible] = useState<boolean>(false);
//   const { categoriesNumBooks } = useLibraryStore();
//   const [counts, setCounts] = useState<{ [key: number]: number }>({});
//   const [showAll, setShowAll] = useState(false);

//   const DISPLAY_LIMIT = 5;
//   const displayedCategories = showAll ? categoriesNumBooks : categoriesNumBooks.slice(0, DISPLAY_LIMIT);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsVisible(true), 300);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     categoriesNumBooks.forEach((category) => {
//       let currentCount = 0;
//       const interval = setInterval(() => {
//         if (currentCount < category.books_count) {
//           setCounts((prev) => ({ ...prev, [category.books_count]: currentCount++ }));
//         } else {
//           clearInterval(interval);
//         }
//       }, 30);
//     });
//   }, [categoriesNumBooks]);

//   return (
//     <div className="flex justify-center items-center py-8">
//       <Card
//         className={`w-4/5 shadow-lg p-6 rounded-lg transition-all duration-700 ease-in-out transform hover:scale-105 bg-gradient-to-t from-cyan-600 to-blue-500 ${
//           isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//         }`}
//       >
//         <CardContent className="text-white">
//           <h2 className="text-lg font-bold mb-6 text-center">کتگوری‌ها</h2>
//           <div className="flex flex-wrap justify-center items-center gap-4 text-center">
//             {displayedCategories.map((category, index) => (
//               <div
//                 key={category.name}
//                 className="transition-all duration-300 transform hover:scale-105 w-[calc(40%-1rem)] sm:w-[calc(30%-1rem)] md:w-[calc(20%-1rem)]"
//                 style={{ transitionDelay: `${index * 100}ms` }}
//               >
//                 <h3 className="text-sm font-medium mb-1">{category.name}</h3>
//                 <p className="text-lg font-bold">{counts[category.books_count] || 0}</p>
//               </div>
//             ))}
//           </div>
//           {categoriesNumBooks.length > DISPLAY_LIMIT && (
//             <div className="flex justify-center mt-6">
//               <Button
//                 variant={"link"}
//                 className="text-white"
//                 onClick={() => setShowAll((prev) => !prev)}
//               >
//                 {showAll ? "دیدن کمتر" : "دیدن همه"}
//               </Button>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { Card, CardContent } from "../ui/card"; 
import React from "react";

const categories = [
  "کتاب‌های هارد",
  "کتاب‌های سافت",
  "کتاب‌های امانتی",
  "مقالات علمی",
  "پایان‌نامه‌ها",
  "جزوات آموزشی",
  "مجلات تخصصی",
  "کتاب‌های مرجع",
  "داستانی و رمان",
  "کتاب‌های درسی",
  // هرچی بخوای میتونی اضافه کنی
];

export default function CategoryAmountsCart() {
  return (
<div className="py-10 px-4">
  <h2 className="text-2xl font-bold text-center mb-8">دسته‌بندی‌های کتابخانه</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {categories.map((category, index) => (
      <Card
        key={index}
        className="w-full h-16 rounded-full bg-blue-50 hover:bg-blue-100 hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center"
      >
        <CardContent className="flex items-center justify-center text-center p-2">
          <span className="text-sm sm:text-base font-medium text-blue-600 hover:text-blue-800 hover:scale-105 transition-transform duration-300">
            {category}
          </span>
        </CardContent>
      </Card>
    ))}
  </div>
</div>


  );
}
