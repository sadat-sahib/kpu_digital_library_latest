import React, { useState } from "react";
import Swal from "sweetalert2";
import UserDetails from "../userTable/userDetails";
import UserRegistration from "../../../Pages/UserRegistration";
import { Users } from "lucide-react";

import {
  useGetActiveUsers,
  useDeleteUser,
} from "../../../config/client/DashUserApi.query";
import { User } from "../../../config/client/DashUserApi";
import UserTableSkeleton from "../userTable/userTableSkeleton";
import ActiveUserTable from "../userTable/activeUserTable";


const DashActiveUsers: React.FC = () => {
  const [selectedFaculty, _setSelectedFaculty] = useState<string>("");
  const [searchTerm, _setSearchTerm] = useState("");
  const [currentPage, _setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);

  const {
    data: users = [],
    isLoading: loadingUsers,
    isError,
  } = useGetActiveUsers();


  const { mutate: deleteUser } = useDeleteUser();

  const handleView = (id: number) => {
    const userToView = users.find((u) => u.id === id);
    if (userToView) setSelectedUser(userToView);
  };

  const handleEdit = (id: number) => {
    setEditingUserId(id);
  };

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
      if (!result.isConfirmed) return;

      setLoadingDelete(id);

      deleteUser(id, {
        onSuccess: () => {
          Swal.fire("حذف شد", "موفقانه حذف گردید.", "success");
        },
        onError: () => {
          Swal.fire("Error", "Failed to delete user", "error");
        },
        onSettled: () => {
          setLoadingDelete(null);
        },
      });
    });
  };

  if (editingUserId !== null) {
    return <UserRegistration userId={editingUserId} />;
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch = `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFaculty =
      selectedFaculty === "" || user.faculty === selectedFaculty;
    return matchesSearch && matchesFaculty;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedUser && (
        <UserDetails
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      <div className="flex justify-start items-center gap-2 mr-5">
        <span className="text-2xl font-bold">لیست کاربران فعال</span>
        <Users size={20} className="text-blue-500" />
      </div>

      {loadingUsers ? (
        <UserTableSkeleton />
      ) : isError ? (
        <div className="text-center text-red-500">
          خطا در گرفتن لیست کاربران
        </div>
      ) : (
        <>
          <ActiveUserTable
            users={currentUsers}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
            loadingDelete={loadingDelete}
            component="Users"
          />
        

        </>
      )}
    </div>
  );
};

export default DashActiveUsers;
