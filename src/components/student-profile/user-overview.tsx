import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { BsPatchCheckFill } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { usegetProfile } from "../../config/client/HomePgeApi.query";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  accountStatus: string;
  accountType: string;
  profileImage: string;
}

interface UserOverviewProps {
  user: User;
}

// export function UserOverview({ user }: UserOverviewProps) {
//   // const { data, isPending } = useGetProfileInfo();
//     const {data:prof, isPending} = usegetProfile()
//     // console.log('prof',prof)

//   if (isPending) {
//     return (
//       <div className="p-4 border rounded-xl shadow-sm space-y-4">
//         <div className="flex justify-center">
//           <Skeleton className="w-24 h-24 rounded-full" />
//         </div>
//         <div className="space-y-2 text-center">
//           <Skeleton className="h-4 w-32 mx-auto" />
//           <Skeleton className="h-3 w-40 mx-auto" />
//           <div className="flex justify-center gap-2 mt-2">
//             <Skeleton className="h-6 w-16 rounded-full" />
//             <Skeleton className="h-6 w-12 rounded-full" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // const userInfo = data?.data.user;
//   const userInfo = prof?.data.user;
//   return (
//     <Card className="py-4 relative border-0  rounded-none  shadow-none ">
//       <Link
//         to="/"
//         className="absolute top-4 right-4 inline-flex items-center px-4 py-2 rounded-xl bg-violet-100 text-blue-600 font-medium transition hover:bg-violet-200"
//       >
//         <span>بازگشت</span>
//         <ArrowRight className="ml-2 w-4 h-4" />
//       </Link>

//       <CardContent className="flex flex-col items-center text-center">
//         <Avatar className="h-24 w-24 rounded-full mb-4">
//           <AvatarImage
//             src={"/1.jpg"}
//             alt={`${prof?.data.user.firstName} ${prof?.data.user.lastName}`}
//             className="h-full w-full rounded-full"
//           />
//           <AvatarFallback>{`${prof?.data.user.firstName.charAt(
//             0
//           )}${user.lastName.charAt(0)}`}</AvatarFallback>
//         </Avatar>

//         <h2 className="text-xl font-semibold">{`${userInfo?.firstName} ${userInfo?.lastName}`}</h2>
//         <p className="text-sm text-muted-foreground mt-1 flex gap-3 justify-center items-center">
//           {userInfo?.email}
//           {userInfo?.status === "active" && (
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <span>
//                     <BsPatchCheckFill
//                       size={16}
//                       className="text-blue-500 text-xl cursor-pointer"
//                     />
//                   </span>
//                 </TooltipTrigger>

//                 <TooltipContent>حساب فعال شده</TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//           )}
//         </p>

//         <div className="flex flex-wrap justify-center gap-2 mt-4">
//           <Badge
//             variant={userInfo?.status === "Active" ? "default" : "secondary"}
//           >
//             {userInfo?.status}
//           </Badge>
//           <Badge variant="outline">{userInfo?.type}</Badge>
//         </div>

//       </CardContent>
//     </Card>
//   );
// }

export function UserOverview({ user }) {
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
