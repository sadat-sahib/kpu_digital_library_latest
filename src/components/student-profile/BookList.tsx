import React from "react";
import { useProfileInfo } from "../../Store/useProfileInfo";

const BookList = () => {
  const { books } = useProfileInfo();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-96 overflow-y-auto pr-6 px-12 scrollbar-thin">
      {books.length > 0 ? (
        books.map((book) => (
          <div
            key={book.book_title}
            className=" bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center w-56"
          >
            <img 
              src={book.book_image} 
              alt={book.book_title} 
              className="w-full h-40 object-cover rounded-lg border border-gray-300"
            />
            <div className="mt-3 text-center">
              <h4 className="text-lg font-bold text-gray-700">{book.book_title}</h4>
              <p className="text-gray-600">نویسنده: {book.book_author}</p>
              <div className="mt-2 text-gray-500 text-sm pb-2">
                <p>تاریخ اخذ: {book.reserve_date}</p>
                <p>تاریخ برگشت: {book.return_date}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">هیچ کتابی در این دسته موجود نیست.</p>
      )}
    </div>
  );
};

export default BookList;
