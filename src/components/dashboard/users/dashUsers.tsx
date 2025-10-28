
// import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import Swal from "sweetalert2";
// import { Loader } from "lucide-react";
// import Pagination from "../pagination/pagination";
// import UserTable from "../userTable/userTable";
// import UserDetails from "../userTable/userDetails";
// import UserRegistration from "../../../Pages/UserRegistration";

// import {
//   useGetAllUsers,
//   useDeleteUser,
// } from "../../../config/client/DashUserApi.query";
// import { useGetFaculties } from "../../../config/client/DashFacultyApi.query";
// import { User } from "../../../config/client/DashUserApi";
// import UpdateUser from "./dashUpdateUser";

// interface Faculty {
//   id: number;
//   name: string;
// }

// const DashUser: React.FC = () => {
  
//   const {
//     data: users = [],
//     isLoading: loadingUsers,
//     refetch: refetchUsers,
//   } = useGetAllUsers();

//   const {
//     data: faculties = [],
//     isLoading: loadingFaculties,
//   } = useGetFaculties();

 
//   const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [editingUserId, setEditingUserId] = useState<number | null>(null);
//   const [selectedFaculty, setSelectedFaculty] = useState<string>("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 10;


//   const handleView = (id: number) => {
//     const userToView = users.find((u) => u.id === id);
//     if (userToView) {
//       setSelectedUser(userToView);
//     }
//   };

 
//   const handleEdit = (id: number) => setEditingUserId(id);

 
//   const handleDelete = (id: number) => {
//     Swal.fire({
//       title: "آیا مطمعن هستید؟",
//       text: "دیتای حذف شده قابل بازیافت نمیباشد!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       cancelButtonText: "نخیر",
//       confirmButtonText: "بلی",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteUser(id, {
//           onSuccess: () => {
//             Swal.fire("حذف شد", "موفقانه حذف گردید.", "success");
//           },
//           onError: () => {
//             Swal.fire("Error", "Failed to delete user", "error");
//           },
//         });
//       }
//     });
//   };

//   const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedFaculty(e.target.value);
//     setCurrentPage(1);
//   };

//   if (editingUserId !== null) return <UpdateUser userId={editingUserId} />;

 
//   const filteredUsers = users.filter((user) => {
//     const matchesSearch = `${user.firstName} ${user.lastName}`
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesFaculty = selectedFaculty === "" || user.faculty === selectedFaculty;
//     return matchesSearch && matchesFaculty;
//   });


//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {selectedUser && (
//         <UserDetails user={selectedUser} onClose={() => setSelectedUser(null)} />
//       )}

//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <h1 className="text-3xl font-bold text-gray-800">همه کاربران</h1>
//         <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
//           <div className="w-full md:w-48">
//             <select
//               value={selectedFaculty}
//               onChange={handleFacultyChange}
//               className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">همه پوهنځی ها</option>
//               {loadingFaculties ? (
//                 <option>در حال بارگذاری...</option>
//               ) : (
//                 faculties.map((faculty: Faculty) => (
//                   <option key={faculty.id} value={faculty.name}>
//                     {faculty.name}
//                   </option>
//                 ))
//               )}
//             </select>
//           </div>

//           <div className="relative w-full md:w-64">
//             <input
//               type="text"
//               placeholder="جستجو..."
//               className="w-full bg-white border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <FaSearch className="absolute left-3 top-3 text-gray-400" />
//           </div>
//         </div>
//       </div>

//       {loadingUsers ? (
//         <div className="flex justify-center items-center h-64">
//           <Loader size={32} className="animate-spin text-blue-600" />
//         </div>
//       ) : (
//         <>
//           <UserTable
//             users={currentUsers}
//             onEdit={handleEdit}
//             onView={handleView}
//             onDelete={handleDelete}
//             loadingDelete={isDeleting ? -1 : null} 
//             component="Users"
//             refetchData={refetchUsers}
//           />

//           {/* <Pagination
//             currentPage={currentPage}
//             totalItems={filteredUsers.length}
//             itemsPerPage={usersPerPage}
//             onPageChange={setCurrentPage}
//           /> */}
//         </>
//       )}
//     </div>
//   );
// };

// export default DashUser;

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Loader, Users } from "lucide-react";
import Swal from "sweetalert2";

import UserTable, { User } from "../userTable/userTable";
import UserDetails from "../userTable/userDetails";
import UpdateUser from "./dashUpdateUser";

import { useGetAllUsers, useDeleteUser } from "../../../config/client/DashUserApi.query";
import { useGetFaculties } from "../../../config/client/DashFacultyApi.query";
import UserTableSkeleton from "../userTable/userTableSkeleton";

interface Faculty {
  id: number;
  name: string;
}

const DashUser: React.FC = () => {
  const { data: users = [], isLoading: loadingUsers, refetch: refetchUsers } = useGetAllUsers();
  const { data: faculties = [], isLoading: loadingFaculties } = useGetFaculties();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleView = (id: number) => {
    const userToView = users.find((u) => u.id === id);
    if (userToView) setSelectedUser(userToView);
  };

  const handleEdit = (id: number) => setEditingUserId(id);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "آیا مطمعن هستید؟",
      text: "دیتای حذف شده قابل بازیافت نمیباشد!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "نخیر",
      confirmButtonText: "بلی",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id, {
          onSuccess: () => {
            Swal.fire("حذف شد", "موفقانه حذف گردید.", "success");
            refetchUsers();
          },
          onError: () => {
            Swal.fire("Error", "Failed to delete user", "error");
          },
        });
      }
    });
  };

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedFaculty(e.target.value);

  if (editingUserId !== null) return <UpdateUser userId={editingUserId} />;

  // Filter users by faculty & search
  const filteredUsers = users.filter((user) => {
    const matchesSearch = `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFaculty = !selectedFaculty || user.faculty === selectedFaculty;
    return matchesSearch && matchesFaculty;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedUser && <UserDetails user={selectedUser} onClose={() => setSelectedUser(null)} />}

      {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">همه کاربران</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <select
            value={selectedFaculty}
            onChange={handleFacultyChange}
            className="w-full md:w-48 bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">همه پوهنځی‌ها</option>
            {loadingFaculties ? (
              <option>در حال بارگذاری...</option>
            ) : (
              faculties.map((faculty: Faculty) => (
                <option key={faculty.id} value={faculty.name}>{faculty.name}</option>
              ))
            )}
          </select>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="جستجو..."
              className="w-full bg-white border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div> */}
                <div className="flex justify-start items-center gap-2 mr-5">
            <span className="text-2xl font-bold">لیست کاربران</span>
            <Users size={20} className="text-blue-500" />
          </div>

      {loadingUsers ? (
        <UserTableSkeleton/>
      ) : (
        <UserTable
          users={filteredUsers}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loadingDelete={isDeleting ? -1 : null}
          component="Users"
        />
      )}
    </div>
  );
};

export default DashUser;
