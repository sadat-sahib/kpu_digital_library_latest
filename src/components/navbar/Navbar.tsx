import { useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCart, User, Menu, Home } from "lucide-react";
import MobileMenuSheet from "./MobileMenuSheet";
import ShoppingCartSheet from "./ShoppingCartSheet";
import ProfileSheet from "./ProfileSheet";
import { useSearchStore } from "../../Store/useSearchStore";
import { useAuthStore } from "../../Store/useAuthStore";
import { useCartStore } from "../../Store/useCartStore";
import React from "react";
import { Link } from "react-router-dom";
import axios from "../../axiosInstance";

interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: number;
  faculty: string;
  department: string;
}
const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isCartSheetOpen, setIsCartSheetOpen] = useState<boolean>(false);
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState<boolean>(false);

  const { cartCount } = useCartStore();
  const { token } = useAuthStore();
  const { query, setQuery, setFilteredResults } = useSearchStore();
  const [filter, setFilter] = useState<string>("all");

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleCartSheet = () => setIsCartSheetOpen((prev) => !prev);
  const toggleProfileSheet = () => setIsProfileSheetOpen((prev) => !prev);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return; // جلوگیری از ارسال درخواست خالی

    try {
      const response = await axios.post<{ data: Book[] }>("/api/books/search", {
        searchType: filter,
        searchKey: query,
      });
      setFilteredResults(response.data.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <>
      <nav className="w-full bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center pl-3">
            <a href="/" className="text-xl font-bold">
              <img src="public/logo.png" alt="Logo" className="h-8" />
            </a>
          </div>
          {/* mobile */}
          <div className="flex items-center gap-2 lg:hidden">


            <div className="flex justify-start">
              <Button
                variant="ghost"
                className="relative px-1"
                onClick={toggleCartSheet}
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                className="px-1"
                onClick={toggleMobileMenu}
              >
                <Menu size={24} />
              </Button>
            </div>
          </div>

          <div className="flex-grow mx-4 hidden lg:flex flex-col lg:flex-row items-center justify-center space-x-6">
            <div className="flex space-x-8">
              <Link
                to="/"
                className="relative group text-gray-700 hover:text-blue-500 font-black ml-2 flex gap-2 justify-center items-center"
              >
                <Home size={16} />
                صفحه اصلی
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/about"
                className="relative group text-gray-700 hover:text-blue-500 font-black ml-2"
              >
                درباره ما
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                to="/contact"
                className="relative group text-gray-700 hover:text-blue-500 font-black"
              >
                تماس با ما
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/books"
                className="relative group text-gray-700 hover:text-blue-500 font-black"
              >
                کتاب ها
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* desktop mode */}

   
          </div>

          <div className="items-center space-x-4 hidden lg:flex">
            <Button
              variant="ghost"
              className="relative"
              onClick={toggleCartSheet}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Button>

            {token ? (
              <Link to={'/student-profile'} className="relative group text-gray-700 hover:text-blue-500 font-black ml-2 flex gap-2 justify-center items-center">
                <User size={20} />
              </Link>
            ) : (
              <div className="flex justify-center items-center gap-2 border border-gray-400 rounded-md p-2 transition-transform duration-300 hover:bg-orange-100 hover:border-orange-300 hover:scale-105">
                <Link to="login" className="hover:underline">
                  ورود
                </Link>{" "}
                /
                <Link to="register" className="hover:underline">
                  {" "}
                  ثبت نام
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <MobileMenuSheet
        open={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
      />
      <ShoppingCartSheet
        open={isCartSheetOpen}
        onOpenChange={setIsCartSheetOpen}
      />
      <ProfileSheet
        open={isProfileSheetOpen}
        onOpenChange={setIsProfileSheetOpen}
      />
    </>
  );
};

export default Navbar;
