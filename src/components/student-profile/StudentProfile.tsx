"use client";

import React from "react";
import { UserIcon, ArrowLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import BookList from "./BookList";
import { Link } from "react-router-dom";

// داده‌های کتاب‌های امانت گرفته شده
const borrowedBooks = [
  {
    id: 1,
    title: "کتاب اول",
    author: "نویسنده اول",
    borrowDate: "1401/01/10",
    returnDate: "1401/02/10",
  },
  {
    id: 2,
    title: "کتاب دوم",
    author: "نویسنده دوم",
    borrowDate: "1401/03/05",
    returnDate: "1401/04/05",
  },
  {
    id: 1,
    title: "کتاب اول",
    author: "نویسنده اول",
    borrowDate: "1401/01/10",
    returnDate: "1401/02/10",
  },
  {
    id: 2,
    title: "کتاب دوم",
    author: "نویسنده دوم",
    borrowDate: "1401/03/05",
    returnDate: "1401/04/05",
  },
];

// داده‌های کتاب‌های درخواست شده
const requestedBooks = [
  {
    id: 101,
    title: "درخواست کتاب اول",
    author: "نویسنده درخواست اول",
    requestDate: "1402/05/12",
    status: "در انتظار تایید",
  },
  {
    id: 102,
    title: "درخواست کتاب دوم",
    author: "نویسنده درخواست دوم",
    requestDate: "1402/06/15",
    status: "تایید شده",
  },
  {
    id: 101,
    title: "درخواست کتاب اول",
    author: "نویسنده درخواست اول",
    requestDate: "1402/05/12",
    status: "در انتظار تایید",
  },
  {
    id: 102,
    title: "درخواست کتاب دوم",
    author: "نویسنده درخواست دوم",
    requestDate: "1402/06/15",
    status: "تایید شده",
  },
];

const StudentProfile = () => {
  const user = {
    avatarUrl: "/default-avatar.png",
    name: "Ali",
    email: "test@gmail.com",
    studentId: "123456",
    phone: "09123456789",
  };

  return (
    <div className="relative">
      {/* دکمه بازگشت به صفحه اصلی */}
      <Link
        to={'/'}
        className="absolute top-4 mt-2 left-4 md:top-8 md:left-8 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={26} />
      </Link>

      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* بخش سمت چپ: مشخصات کاربر */}
          <div className="md:w-1/3 p-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white mb-4">
              <UserIcon size={48} className="text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
            <p className="text-lg mb-1">{user.email}</p>
            <p className="mb-1">کد دانشجویی: {user.studentId}</p>
            <p>تلفن: {user.phone}</p>
          </div>

          {/* بخش سمت راست: تب‌ها و لیست کتاب */}
          <div className="md:w-2/3 p-8">
            <Tabs defaultValue="borrowed">
              <TabsList className="w-full flex justify-end mb-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="borrowed" className="px-4 py-2">
                  کتاب‌های امانت گرفته شده
                </TabsTrigger>
                <TabsTrigger value="requested" className="px-4 py-2">
                  کتاب‌های درخواست شده
                </TabsTrigger>
              </TabsList>

              <TabsContent value="borrowed">
                <BookList books={borrowedBooks} type="borrowed" />
              </TabsContent>

              <TabsContent value="requested">
                <BookList books={requestedBooks} type="requested" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
