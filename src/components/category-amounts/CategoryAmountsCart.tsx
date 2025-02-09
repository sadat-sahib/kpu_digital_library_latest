import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import React from "react";
import { useLibraryStore } from "../../Store/useLibraryInformation";
import { Button } from "../ui/button";

export default function CategoryAmountsCart() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { categoriesNumBooks } = useLibraryStore();
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  const [showAll, setShowAll] = useState(false);

  const DISPLAY_LIMIT = 5;
  const displayedCategories = showAll ? categoriesNumBooks : categoriesNumBooks.slice(0, DISPLAY_LIMIT);

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
          <div className="flex flex-wrap justify-center items-center gap-4 text-center">
            {displayedCategories.map((category, index) => (
              <div
                key={category.name}
                className="transition-all duration-300 transform hover:scale-105 w-[calc(40%-1rem)] sm:w-[calc(30%-1rem)] md:w-[calc(20%-1rem)]"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-sm font-medium mb-1">{category.name}</h3>
                <p className="text-lg font-bold">{counts[category.books_count] || 0}</p>
              </div>
            ))}
          </div>
          {categoriesNumBooks.length > DISPLAY_LIMIT && (
            <div className="flex justify-center mt-6">
              <Button
                variant={"link"}
                className="text-white"
                onClick={() => setShowAll((prev) => !prev)}
              >
                {showAll ? "دیدن کمتر" : "دیدن همه"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
