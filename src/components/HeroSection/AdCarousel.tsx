import { Link } from "react-router-dom";
import { useAuthStore } from "../../Store/useAuthStore";
import React from "react";

export default function AdBanner() {
  const { token } = useAuthStore();

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-md overflow-hidden">
      <img
        src="/33.jpg"
        alt="Advertisement"
        className="object-cover w-full h-full blur-sm"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center">
          به کتابخانه دیجیتالی پوهنتون پولیتخنیک کابل خوش آمدید
        </h1>
        <p className="text-sm sm:text-base lg:text-lg max-w-[80%] text-center mb-6">
          جایی که شما می‌توانید کتاب‌های مورد علاقه خود را پیدا و دنیای جدیدی از دانش را کشف کنید.
        </p>
        {!token && (
          <div className="flex gap-4">
            <Link to={'/login'} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center">
              ورود
            </Link>
            <Link to={'/register'} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-center">
              ثبت نام
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
