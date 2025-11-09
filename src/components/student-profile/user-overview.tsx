
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { BsPatchCheckFill } from "react-icons/bs";
import { ArrowRight } from "lucide-react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  status: string
  type: string,
  image: string
  accountStatus: string;
  accountType: string;
  profileImage: string;
}

interface UserOverviewProps {
  user: User;
}


export function UserOverview({ user }:UserOverviewProps) {
  if (!user) return null;

  return (
    <Card className="py-4 relative border-0 rounded-none shadow-none">
      <Link
        to="/"
        className="absolute top-4 right-4 inline-flex items-center px-4 py-2 rounded-xl bg-violet-100 text-blue-600 font-medium transition hover:bg-violet-200"
      >
        <span>بازگشت</span>
        <ArrowRight className="ml-2 w-4 h-4" />
      </Link>

      <CardContent className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 rounded-full mb-4">
          <AvatarImage src={user.image ? `/${user.image}` : "/1.jpg"} />
          <AvatarFallback>
            {user.firstName?.charAt(0)}
            {user.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <h2 className="text-xl font-semibold">{`${user.firstName} ${user.lastName}`}</h2>
        <p className="text-sm text-muted-foreground mt-1 flex gap-3 justify-center items-center">
          {user.email}
          {user.status === "active" && (
            <BsPatchCheckFill size={16} className="text-blue-500" />
          )}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <Badge>{user.status}</Badge>
          <Badge variant="outline">{user.type}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
