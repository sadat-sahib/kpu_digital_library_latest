import { UserDetails } from "./user-details";
import { UserOverview } from "./user-overview";
import { TabsBooks } from "./tabs-books";
import { usegetProfile } from "../../config/client/HomePgeApi.query";

<<<<<<< HEAD

export default function UserProfile() {
  const { data: prof, isPending } = usegetProfile();

  if (isPending) return <div>در حال بارگذاری...</div>;

  const userData = prof?.data?.user;

=======
// Mock user data
const userData = {
  id: "user123",
  firstName: "Alex",
  lastName: "Johnson",
  fatherName: "Michael Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  accountStatus: "Active",
  accountType: "Premium",
  profileImage: "/2.jpg",
};

// Mock borrowed books data
// const borrowedBooks = [
//   {
//     id: "book1",
//     title: "The Design of Everyday Things",
//     author: "Don Norman",
//     borrowDate: "2023-10-15",
//     image: "/1.jpg",
//   },
//   {
//     id: "book2",
//     title: "Atomic Habits",
//     author: "James Clear",
//     borrowDate: "2023-11-02",
//     image: "/1.jpg",
//   },
//   {
//     id: "book3",
//     title: "Thinking, Fast and Slow",
//     author: "Daniel Kahneman",
//     borrowDate: "2023-11-10",
//     image: "/1.jpg",
//   },
// ];

// Mock requested books data
// const requestedBooks = [
//   {
//     id: "req1",
//     title: "Sapiens: A Brief History of Humankind",
//     author: "Yuval Noah Harari",
//     requestDate: "2023-11-15",
//     image: "/1.jpg",
//   },
//   {
//     id: "req2",
//     title: "The Psychology of Money",
//     author: "Morgan Housel",
//     requestDate: "2023-11-18",
//     image: "/1.jpg",
//   },
//   {
//     id: "req2",
//     title: "The Psychology of Money",
//     author: "Morgan Housel",
//     requestDate: "2023-11-18",
//     image: "/1.jpg",
//   },
//   {
//     id: "req1",
//     title: "Sapiens: A Brief History of Humankind",
//     author: "Yuval Noah Harari",
//     requestDate: "2023-11-15",
//     image: "/1.jpg",
//   },
//   {
//     id: "req2",
//     title: "The Psychology of Money",
//     author: "Morgan Housel",
//     requestDate: "2023-11-18",
//     image: "/1.jpg",
//   },
//   {
//     id: "req2",
//     title: "The Psychology of Money",
//     author: "Morgan Housel",
//     requestDate: "2023-11-18",
//     image: "/1.jpg",
//   },
// ];

export default function UserProfile() {
    const { data: prof } = usegetProfile();
    console.log("prof", prof);
>>>>>>> 3cee650 (fix comments)
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
