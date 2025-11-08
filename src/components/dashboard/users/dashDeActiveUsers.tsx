import React, { useState } from "react";
import Swal from "sweetalert2";
import UserDetails from "../userTable/userDetails";
import UserRegistration from "../../../Pages/UserRegistration";
import { Users } from "lucide-react";
import {
  useGetInActiveUsers,
  useDeleteUser,
} from "../../../config/client/DashUserApi.query";
import { useGetFaculties } from "../../../config/client/DashFacultyApi.query";

import { User } from "../../../config/client/DashUserApi";
import UserTableSkeleton from "../userTable/userTableSkeleton";
import DeActiveUserTable from "../userTable/deActiveUserTable";

interface Faculty {
  id: number;
  name: string;
}

const DashDeActiveUsers: React.FC = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useGetInActiveUsers();
  const { data: faculties = [] } = useGetFaculties();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const handleEdit = (id: number) => {
    setEditingUserId(id);
  };

  const handleView = (id: number) => {
    const userToView = users.find((user) => user.id === id);
    if (userToView) setSelectedUser(userToView);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "آیا مطمعن هستید؟",
      text: "دیتای حذف شده قابل بازیافت نمیباشد!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "نخیر",
      confirmButtonText: "بلی",
    });

    if (result.isConfirmed) {
      deleteUser(id, {
        onSuccess: () => Swal.fire("حذف شد", "موفقانه حذف گردید.", "success"),
        onError: () => Swal.fire("Error", "Failed to delete user", "error"),
      });
    }
  };

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFaculty(e.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFaculty =
      selectedFaculty === "" || user.faculty === selectedFaculty;

    return matchesSearch && matchesFaculty;
  });

  if (editingUserId !== null) {
    return <UserRegistration userId={editingUserId} />;
  }

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
        <span className="text-2xl font-bold">لیست کاربران غیرفعال</span>
        <Users size={20} className="text-blue-500" />
      </div>

      {isLoading ? (
        <UserTableSkeleton />
      ) : isError ? (
        <div className="text-center text-red-500">
          خطا در گرفتن لیست کاربران
        </div>
      ) : (
        <>
          <DeActiveUserTable
            users={currentUsers}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
            loadingDelete={isDeleting ? -1 : null}
            component="Deactivate-Users"
            refetchData={refetch}
          />
        </>
      )}
    </div>
  );
};

export default DashDeActiveUsers;
