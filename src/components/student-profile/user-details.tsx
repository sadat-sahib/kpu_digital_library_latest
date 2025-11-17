
import { Card, CardContent } from "../ui/card";

import { BsPatchCheckFill } from "react-icons/bs";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { useAuthStore } from "../../Store/useAuthStore";
import axios from "../../axiosInstance";


interface User {
  id: string | number,
  firstName: string,
  lastName: string,
  fatherName: string,
  email: string,
  phone: string | "+1 (555) 123-4567",
  status: string,
  profileImage: string,
}

interface UserOverviewProps {
  user: User;
}

export function UserDetails({ user }: UserOverviewProps) {
  const { token, clearUser } = useAuthStore();

  const handleSignout = async () => {
    try {
      await axios.post("/api/logout", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      clearUser();
    } catch (err) {
      
    }
  };

  if (!user) return null;

  return (
    <Card className="border-none shadow-none">
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            نام: <span className="text-black">{user.firstName}</span>
          </h3>
          <h3 className="text-sm font-medium text-muted-foreground">
            تخلص: <span className="text-black">{user.lastName}</span>
          </h3>
          <h3 className="text-sm font-medium text-muted-foreground">
            شماره تماس: <span className="text-black">{user.phone ?? "-"}</span>
          </h3>
          <h3 className="text-sm font-medium text-muted-foreground">
            ایمیل: <span className="text-black">{user.email}</span>
          </h3>
          <h3 className="text-sm font-medium text-muted-foreground flex">
            وضعیت حساب:{" "}
            <span className="text-black flex items-center gap-2">
              {user.status}
              {user.status === "active" && (
                <BsPatchCheckFill size={13} className="text-blue-500" />
              )}
            </span>
          </h3>
        </div>

        <div className="flex justify-center items-center pt-12">
          <Button size="sm" className="w-full" variant="destructive" onClick={handleSignout}>
            <LogOutIcon />
            خروج از حساب
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
