

import { useGetAllCategories, useGetAllInformation, useGetBookDetailById, usegetFacultyWithDepartments, usegetHomeData, useNewgetCategoriesWithBooks } from "../../config/client/HomePgeApi.query";
import { Card, CardContent } from "../ui/card";
import React from "react";
import CategoryAmountsCartSkeleton from "./CategorySkeleton";

export default function CategoryAmountsCart() {

  const { data:cate, isPending} = useGetAllCategories();



    const categories = cate?.data.data || [];
  if(isPending) {
    return <CategoryAmountsCartSkeleton/>
  }

  return (
    <div className="py-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">دسته‌بندی‌های کتابخانه</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

        {
        categories.map((category, index) => (
          <Card
            key={index}
            className="w-full h-16 rounded-full bg-blue-50 hover:bg-blue-100 hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center"
          >
            <CardContent className="flex items-center justify-center text-center p-2">
              <span className="text-sm sm:text-base font-medium text-blue-600 hover:text-blue-800 hover:scale-105 transition-transform duration-300">
                {category.name}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
