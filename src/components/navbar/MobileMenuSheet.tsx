import React, { useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCart, User, Home, Info, Phone } from "lucide-react";
import ShoppingCartSheet from "./ShoppingCartSheet";
import ProfileSheet from "./ProfileSheet";
import { Sheet, SheetContent } from "../ui/sheet";
import { useCartStore } from "../../Store/useCartStore"; // Import Cart Store

interface MobileMenuSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileMenuSheet: React.FC<MobileMenuSheetProps> = ({ open, onOpenChange }) => {
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
              <a href="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 gap-2">
                <Home size={20} /> <span>Home</span>
              </a>
              <a href="/about" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 gap-2">
                <Info size={20} /> <span>About</span>
              </a>
              <a href="/contact" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 gap-2">
                <Phone size={20} /> <span>Contact</span>
              </a>
            </div>

            {/* Shopping Cart and Profile in Mobile */}
            <div className="flex space-x-4 justify-center">
              {/* Shopping Cart Button */}
              <Button variant="ghost" className="relative" onClick={toggleCartSheet}>
                <ShoppingCart size={20} />
                {cartCount && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Button>

              {/* Profile Button */}
              <Button variant="ghost" onClick={() =>{ toggleProfileSheet();
                 onOpenChange(false);}}>
                <User size={20} />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ShoppingCartSheet */}
      <ShoppingCartSheet open={isCartSheetOpen} onOpenChange={setIsCartSheetOpen} />

      {/* ProfileSheet */}
      <ProfileSheet open={isProfileSheetOpen} onOpenChange={setIsProfileSheetOpen} />
    </>
  );
};

export default MobileMenuSheet;
