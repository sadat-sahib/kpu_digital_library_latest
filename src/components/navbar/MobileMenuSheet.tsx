import React, { useState } from "react";
import { User, Home, Info, Phone, BookA } from "lucide-react";
import ShoppingCartSheet from "./ShoppingCartSheet";
import ProfileSheet from "./ProfileSheet";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet"; // ✅ import SheetHeader & SheetTitle
import { useCartStore } from "../../Store/useCartStore";
import { Link } from "react-router-dom";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // ✅ import this

interface MobileMenuSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileMenuSheet = ({
  open,
  onOpenChange,
}:MobileMenuSheetProps) => {
  const [isCartSheetOpen, setIsCartSheetOpen] = useState(false);
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false);
  const { cartCount } = useCartStore();

  const toggleCartSheet = () => setIsCartSheetOpen(!isCartSheetOpen);
  const toggleProfileSheet = () => setIsProfileSheetOpen(!isProfileSheetOpen);

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent>
          {/* ✅ Add hidden accessible title */}
          <SheetHeader>
            <VisuallyHidden>
              <SheetTitle>Mobile Navigation Menu</SheetTitle>
            </VisuallyHidden>
          </SheetHeader>

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

            {/* Shopping Cart and Profile */}
            <div className="flex space-x-4 justify-center">
              <Link
                to="/student-profile"
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
