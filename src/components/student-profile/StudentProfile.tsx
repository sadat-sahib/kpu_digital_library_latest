"use client";

import React from "react";
import { UserIcon, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../Store/useAuthStore";
import { useProfileInfo } from "../../Store/useProfileInfo";
import BookList from "./BookList";

const StudentProfile = () => {
  const { token } = useAuthStore();
  const { user } = useProfileInfo();
  console.log('profile token', token)
  console.log('users',user)
  return (
    <div className="relative">
      
      <Link
        to="/"
        className="absolute top-4 mt-2 left-4 ml-2 md:top-8 md:left-8 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={26} />
      </Link>

      <div className="max-w-7xl min-h-screen mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row h-screen">
          
          <div className="md:w-1/3 p-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white mb-4">
              <UserIcon size={48} className="text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold mb-2">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-lg mb-1">{user?.email}</p>
            <p className="mb-1">وضعیت: {user?.status}</p>
            <p>نوع حساب: {user?.type}</p>
          </div>

          <div className="md:w-2/3 p-8">
            <h3 className="text-2xl font-bold mb-4">کتاب‌ها</h3>
            <BookList  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
