import { useState, useEffect } from "react";
import { Book, FileText, Library } from "lucide-react";

interface Category {
  id: number;
  title: string;
  icon: JSX.Element;
  count: number;
}

const categories: Category[] = [
  {
    id: 1,
    title:"کتاب های کتبی",
    icon: <Book size={18} className="text-white" />,
    count: 1345,
  },
  {
    id: 2,
    title: "کتاب های سافت",
    icon: <FileText size={18} className="text-white" />,
    count: 1345,
  },
  {
    id: 3,
    title: "کل کتاب ها",
    icon: <Library size={18} className="text-white" />,
    count: 1345,
  },
];

export default function CategoryAmountsCart() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="py-8 px-4 ">
      <h2 className="text-xl font-bold mb-6 text-center">اطلاعات کلی کتابخانه</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`w-24 h-32 sm:w-28 sm:h-36 md:w-36 md:h-44 bg-gradient-to-t from-cyan-600 to-blue-500 text-white flex flex-col justify-center items-center rounded-lg shadow-lg transform transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } hover:scale-110 hover:shadow-2xl`}
            style={{
              transitionDelay: `${index * 150}ms`,
            }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-full flex items-center justify-center mb-3 transform transition-all duration-300 hover:rotate-12 hover:scale-105">
              {category.icon}
            </div>
            <p className="text-orange-400 text-lg font-bold">{category.count}</p>
            <h3 className="text-sm font-medium mt-2">{category.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
