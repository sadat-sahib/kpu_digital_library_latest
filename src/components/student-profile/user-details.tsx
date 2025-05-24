import React from "react";
import { Card, CardContent } from "../ui/card";

import { BsPatchCheckFill } from "react-icons/bs";
import { usegetProfile } from "../../config/client/HomePgeApi.query";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { useAuthStore } from "../../Store/useAuthStore";
import axios from "../../axiosInstance";

interface User {
  firstName: string;
  lastName: string;
  fatherName: string;
  email: string;
  phone: string;
  accountStatus: string;
}

interface UserDetailsProps {
  user: User;
}

export function UserDetails({ user }: UserDetailsProps) {
    const { token, clearUser } = useAuthStore();
        const {data:prof, isPending} = usegetProfile()
        console.log('prof',prof)
  
    // const { data:userata,  } = useGetProfileInfo()
    // console.log('data_for_profile_new',userata);
  
    const handleSignout = () => {
      axios.post("/api/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        clearUser();
        console.log('log out res', response);
      });
     
    };
  
  // const { data, isPending } = useGetProfileInfo();
  if (isPending) {
    return (
      <div className="p-4 border rounded-xl shadow-sm space-y-4">
        {Array(7)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-32" />
            </div>
          ))}
      </div>
    );
  }
  // const UserDetails = data?.data.user;
  const UserDetails = prof?.data.user;
  return (
    <Card className="border-none shadow-none ">
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              نام: <span className="text-black">{UserDetails?.firstName}</span>
            </h3>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              تخلص: <span className="text-black">{UserDetails?.lastName}</span>{" "}
            </h3>
          </div>
{/* 
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              نام پدر :<span className="text-black">{user.fatherName}</span>
            </h3>
          </div> */}

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              شماره تماس :<span className="text-black">{user.phone}</span>
            </h3>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              ایمیل :<span className="text-black">{UserDetails?.email}</span>
            </h3>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground flex">
              وضعیت حساب :{" "}
              <span className="text-black flex items-center gap-2">
                {UserDetails?.status}{" "}
                {UserDetails?.status === "active" && (
                  <BsPatchCheckFill
                    size={13}
                    className="text-blue-500 text-xl "
                  />
                )}
              </span>
            </h3>
          </div>
        </div>
        <div className="flex justify-center items-center mt-3">
          <Button size="sm" className="w-full" variant="destructive" 
          onClick={handleSignout}>
            <LogOutIcon />
            خروج از حساب
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
