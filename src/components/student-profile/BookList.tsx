import React from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  borrowDate?: string;
  returnDate?: string;
  requestDate?: string;
  status?: string;
}

interface BookListProps {
  books: Book[];
  type: "borrowed" | "requested";
}

const BookList: React.FC<BookListProps> = ({ books, type }) => {
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-6 px-12 scrollbar-thin">
      {books.length > 0 ? (
        books.map((book) => (
          <div
            key={book.id}
            className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="mt-2 md:mt-0 text-gray-500 text-sm">
                {type === "borrowed" ? (
                  <>
                    <p>تاریخ اخذ: {book.borrowDate}</p>
                    <p>تاریخ برگشت: {book.returnDate}</p>
                  </>
                ) : (
                  <>
                    <p>تاریخ درخواست: {book.requestDate}</p>
                    <p>وضعیت: {book.status}</p>
                  </>
                )}
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-700">{book.title}</h4>
                <p className="text-gray-600">نویسنده: {book.author}</p>
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
