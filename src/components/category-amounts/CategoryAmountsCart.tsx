// import { useState, useEffect } from "react";
// import { Card, CardContent } from "../ui/card";
// import {
//   Building,
//   Monitor,
//   Calculator,
//   Factory,
//   Ruler,
//   Book,
//   TreeDeciduous,
//   Mountain,
//   Wrench,
// } from "lucide-react";
// import React from "react";
// import { useLibraryStore } from "../../Store/useLibraryInformation"

// // تعریف نوع برای هر دسته‌بندی (کتگوری)
// interface Category {
//   id: number;
//   title: string;
//   icon: JSX.Element;
//   count: number;
//   color: string; // برای رنگ آیکون
// }

// const categories: Category[] = [
//   {
//     id: 1,
//     title: "آب و محیط زیست",
//     icon: <TreeDeciduous size={24} className="text-green-500" />,
//     count: 1345,
//     color: "bg-green-100",
//   },
//   {
//     id: 2,
//     title: "الکترومیکانیک",
//     icon: <Wrench size={24} className="text-purple-500" />,
//     count: 1345,
//     color: "bg-purple-100",
//   },
//   {
//     id: 3,
//     title: "ساختمانی",
//     icon: <Building size={24} className="text-blue-500" />,
//     count: 1345,
//     color: "bg-blue-100",
//   },
//   {
//     id: 4,
//     title: "جیولوجی و معادن",
//     icon: <Mountain size={24} className="text-green-600" />,
//     count: 1345,
//     color: "bg-green-100",
//   },
//   {
//     id: 5,
//     title: "کمپیوتر ساینس",
//     icon: <Monitor size={24} className="text-orange-500" />,
//     count: 1345,
//     color: "bg-orange-100",
//   },
//   {
//     id: 6,
//     title: "ریاضی و هندسه ترسیمی",
//     icon: <Calculator size={24} className="text-green-600" />,
//     count: 1345,
//     color: "bg-green-100",
//   },
//   {
//     id: 7,
//     title: "ثقافت اسلامی",
//     icon: <Book size={24} className="text-purple-500" />,
//     count: 1345,
//     color: "bg-purple-100",
//   },
//   {
//     id: 8,
//     title: "صنایع کیمیایی",
//     icon: <Factory size={24} className="text-pink-500" />,
//     count: 1345,
//     color: "bg-pink-100",
//   },
//   {
//     id: 9,
//     title: "ساختمان‌های ترانسپورتی",
//     icon: <Ruler size={24} className="text-yellow-500" />,
//     count: 1345,
//     color: "bg-yellow-100",
//   },
// ];

// export default function CategoryAmountsCart() {
//   const [isVisible, setIsVisible] = useState<boolean>(false);
//   const {  categoriesNumBooks} = useLibraryStore();
//   console.log('categories num books', categoriesNumBooks)


//   useEffect(() => {
//     const timer = setTimeout(() => setIsVisible(true), 300);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="py-8 ">
//       <h2 className="text-lg font-bold mb-6 text-center">کتگوری‌ها</h2>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center items-center">
//         {categories.map((category, index) => (
//           <Card
//             key={category.id}
//             className={`shadow-md py-2 px-3 rounded-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg bg-gradient-to-t from-cyan-600 to-blue-500 ${
//               isVisible
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-10"
//             }`}
//             style={{ transitionDelay: `${index * 100}ms` }}
//           >
//             <CardContent className="flex flex-col items-center text-center ">
//               <div
//                 className={`mb-2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-opacity-90 ${category.color}`}
//               >
//                 {category.icon}
//               </div>
//               <h3 className="text-sm font-medium  mb-1 text-white">
//                 {category.title}
//               </h3>
//               <p className="text-xs text-white">{category.count}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import React from "react";
import { useLibraryStore } from "../../Store/useLibraryInformation";

export default function CategoryAmountsCart() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { categoriesNumBooks } = useLibraryStore();
  const [counts, setCounts] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    categoriesNumBooks.forEach((category) => {
      let currentCount = 0;
      const interval = setInterval(() => {
        if (currentCount < category.books_count) {
          setCounts((prev) => ({ ...prev, [category.books_count]: currentCount++ }));
        } else {
          clearInterval(interval);
        }
      }, 30);
    });
  }, [categoriesNumBooks]);

  return (
    <div className="flex justify-center items-center py-8">
      <Card
        className={`w-4/5 shadow-lg p-6 rounded-lg transition-all duration-700 ease-in-out transform hover:scale-105 bg-gradient-to-t from-cyan-600 to-blue-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <CardContent className="text-white">
          <h2 className="text-lg font-bold mb-6 text-center">کتگوری‌ها</h2>
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {categoriesNumBooks.map((category, index) => (
              <div
                key={category.name}
                className="transition-all duration-300 transform hover:scale-105 w-[calc(50%-1rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1rem)]"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-sm font-medium mb-1">{category.name}</h3>
                <p className="text-lg font-bold">{counts[category.books_count] || 0}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
