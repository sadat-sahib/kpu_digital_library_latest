import React, { useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCart, User, Home, Info, Phone, BookA } from "lucide-react";
import ShoppingCartSheet from "./ShoppingCartSheet";
import ProfileSheet from "./ProfileSheet";
import { Sheet, SheetContent } from "../ui/sheet";
import { useCartStore } from "../../Store/useCartStore"; // Import Cart Store
import { Link } from "react-router-dom";

interface MobileMenuSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileMenuSheet: React.FC<MobileMenuSheetProps> = ({
  open,
  onOpenChange,
}) => {
  const [isCartSheetOpen, setIsCartSheetOpen] = useState(false); // For ShoppingCartSheet
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false); // For ProfileSheet
  const { cartCount } = useCartStore(); // Get cart count from Zustand Store

  // Toggle the Shopping Cart Sheet
  const toggleCartSheet = () => {
    setIsCartSheetOpen(!isCartSheetOpen);
  };

  // Toggle the Profile Sheet
  const toggleProfileSheet = () => {
    setIsProfileSheetOpen(!isProfileSheetOpen);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent>
          <div className="p-4 flex flex-col items-center space-y-6">
            {/* Links in Mobile */}
            <div className="flex flex-col space-y-4 text-center">
              <a
                href="/"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 gap-2 font-black"
              >
                <Home size={20} /> <span>صفحه اصلی</span>
              </a>
              <a
                href="/about"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 gap-2 font-black"
              >
                <Info size={20} /> <span>درباره ما</span>
              </a>
              <a
                href="/contact"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 gap-2 font-black"
              >
                <Phone size={20} /> <span>تماس با ما</span>
              </a>
              <a
                href="/books"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 gap-2 font-black"
              >
                <BookA size={20} /> <span>کتاب ها</span>
              </a>
            </div>

            {/* Shopping Cart and Profile in Mobile */}
            <div className="flex space-x-4  justify-center ">
              {/* <Button
                variant="ghost"
                className="relative"
                onClick={toggleCartSheet}
              >
                <ShoppingCart size={20} />
                {cartCount && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Button> */}

              <Link
                to={"/student-profile"}
                className="relative group text-gray-700 hover:text-blue-500 font-black ml-8 flex gap-2 justify-center items-center"
              >
                <User size={20} /> <span>پروفایل</span>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ShoppingCartSheet */}
      <ShoppingCartSheet
        open={isCartSheetOpen}
        onOpenChange={setIsCartSheetOpen}
      />

      {/* ProfileSheet */}
      <ProfileSheet
        open={isProfileSheetOpen}
        onOpenChange={setIsProfileSheetOpen}
      />
    </>
  );
};

export default MobileMenuSheet;
