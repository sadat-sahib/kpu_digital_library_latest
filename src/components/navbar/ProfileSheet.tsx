import React from "react";
import {
  Sheet,
  SheetContent,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useAuthStore } from "../../Store/useAuthStore";

import { LogOut, User as UserIcon } from "lucide-react";
import axios from "../../axiosInstance";
import { Link } from "react-router-dom";
import { useGetProfileInfo } from '../../config/client/HomePgeApi.query'
interface ProfileSheetProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const ProfileSheet: React.FC<ProfileSheetProps> = ({ open, onOpenChange }) => {
  const { token, clearUser } = useAuthStore();

  const { data, isPending, error } = useGetProfileInfo()
  // console.log('data_for_profile_new',data);

  const handleSignout = () => {
    axios.post("/api/logout", {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      clearUser();
      console.log('log out res', response);
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-80 flex flex-col h-full">
        <div className="flex-1 mt-6 space-y-6 flex flex-col items-center">
          {isPending ? (
            <p>در حال بارگذاری...</p>
          ) : error ? (
            <p className="text-red-500">خطا در دریافت اطلاعات</p>
          ) : (
            <Link to={'/student-profile'} onClick={() => onOpenChange(false)}>
              <div className="flex justify-around items-center gap-6 space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserIcon size={32} className="text-gray-500" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-800">
                    {data?.data.user.firstName}  {data?.data.user.lastName}
                  </p>
                </div>
              </div>
            </Link>
          )}
          {/* <div className="flex justify-center items-center gap-3">
            <BookA size={18} />
            <Link to={'./student-profile'}>کتاب های گرفته شده</Link>
          </div> */}
        </div>
        <div className="mt-auto w-full pb-4">
          <Button
            variant="destructive"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleSignout}
          >
            <LogOut size={20} />
            خروج از حساب
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileSheet;
