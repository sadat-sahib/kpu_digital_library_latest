import { View } from 'lucide-react';
import React from 'react';

interface Book {
  id: number;
  book_title: string;
  book_author: string;
  return_date: string;
  reserve_date: string;
}

interface BookTableProps {
  books: Book[];
  onView: (id: number) => void;
}

const ReservedTable: React.FC<BookTableProps> = ({ books, onView }) => {
  console.log(books);
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-right">عنوان</th>
            <th className="py-3 px-6 text-right">نویسنده</th>
            <th className="py-3 px-6 text-right">تاریخ اجرا</th>
            <th className="py-3 px-6 text-right">تاریخ بازگشت</th>
            <th className="py-3 px-6 text-center">عملیات</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {books.map((book) => (
            <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-right whitespace-nowrap">
                <div className="font-medium">{book.book_title}</div>
              </td>
              <td className="py-3 px-6 text-right">{book.book_author}</td>
              <td className="py-3 px-6 text-right">{book.return_date}</td>
              <td className="py-3 px-6 text-right">{book.reserve_date}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button
                    onClick={() => onView(book.id)}
                    className="w-8 h-8 mr-2 transform text-green-400 hover:text-green-500 hover:scale-110 flex items-center justify-center"
                    
                  >
                      <View height={20} width={20}/>
                  </button>
                
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservedTable;

