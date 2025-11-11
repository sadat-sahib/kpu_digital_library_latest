
import React from "react";
import { toJalaliPersian } from "../../../utils/dateUtils"; // 👈 Import the helper

interface Book {
  book_author: string;
  book_code: string;
  book_status: string;
  book_title: string;
  category: string;
  id: number;
  isbn: string;
  publicationYear: string;
  return_date: string;
  reserve_date: string;
  section: string;
  shelf: number;
  total_book: number;
  user_id: number;
}

const ReservedDetails: React.FC<{ book: Book; onClose: () => void }> = ({
  book,
  onClose,
}) => {
  console.log("book reserved details", book);
  
  
  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full h-auto">
        <h2 className="text-3xl font-bold mb-4">{book.book_title}</h2>
        <div className="overflow-y-auto max-h-96">
          <div className="space-y-2">
            <p>
              <strong>عنوان:</strong> {book.book_title}
            </p>
            <p>
              <strong>نویسنده:</strong> {book.book_author}
            </p>
            <p>
              <strong>تاریخ بازگشت:</strong> {toJalaliPersian(book.return_date)} {/* 👈 Fixed */}
            </p>
            <p>
              <strong>تاریخ ثبت:</strong> {toJalaliPersian(book.reserve_date)} {/* 👈 Fixed */}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300"
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default ReservedDetails;