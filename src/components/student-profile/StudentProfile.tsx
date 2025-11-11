import { UserDetails } from "./user-details";
import { UserOverview } from "./user-overview";
import { TabsBooks } from "./tabs-books";
import { usegetProfile } from "../../config/client/HomePgeApi.query";
import StudentProfileSkeleton from "./StudentProfileSkeleton";



export default function UserProfile() {
    

    const { data: prof, isPending } = usegetProfile();
    if (isPending) return <StudentProfileSkeleton />;
      const userData = prof?.data?.user;

  return (
    <div className="space-y-8 py-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 border-0 border-l border-l-gray-300">
          <div className="px-2 rounded-lg">
            <UserOverview user={userData} />
            <UserDetails user={userData} />
          </div>
        </div>
        <TabsBooks
          borrowedBooks={prof?.data?.reserved_books}
          requestedBooks={prof?.data?.requested_books}
        />
      </div>
    </div>
  );
}
