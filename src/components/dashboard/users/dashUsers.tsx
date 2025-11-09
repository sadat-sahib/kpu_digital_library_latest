

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

import UserTable, { User } from "../userTable/userTable";
import UserDetails from "../userTable/userDetails";
import UpdateUser from "./dashUpdateUser";

import { useGetAllUsers, useDeleteUser } from "../../../config/client/DashUserApi.query";
import { useGetFaculties } from "../../../config/client/DashFacultyApi.query";
import UserTableSkeleton from "../userTable/userTableSkeleton";
import { Users } from "lucide-react";

interface Faculty {
  id: number;
  name: string;
}

const DashUser: React.FC = () => {
  const {
    data: users = [],
    isLoading: loadingUsers,
    refetch: refetchUsers,
  } = useGetAllUsers();
  const { data: faculties = [], isLoading: loadingFaculties } =
    useGetFaculties();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ When clicking "Edit", update URL with ?editing=<id>
  const handleEdit = (id: number) => {
    setEditingUserId(id);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("editing", id.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  // ✅ On mount, if ?editing=id exists, open edit mode
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const editingParam = searchParams.get("editing");
    if (editingParam) {
      setEditingUserId(Number(editingParam));
    }
  }, [location.search]);

  // ✅ Close edit mode and remove query param
  const closeEditForm = () => {
    setEditingUserId(null);
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("editing");
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
    refetchUsers(); // refresh table after update
  };

  const handleView = (id: number) => {
    const userToView = users.find((u) => u.id === id);
    if (userToView) setSelectedUser(userToView);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "دیتای حذف شده قابل بازیافت نمی‌باشد!",
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
            Swal.fire("خطا", "حذف انجام نشد.", "error");
          },
        });
      }
    });
  };

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedFaculty(e.target.value);

  // ✅ When editing, render the form component
  if (editingUserId !== null)
    return <UpdateUser userId={editingUserId} onClose={closeEditForm} />;

  // ✅ Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch = `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFaculty = !selectedFaculty || user.faculty === selectedFaculty;
    return matchesSearch && matchesFaculty;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedUser && (
        <UserDetails
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      <div className="flex justify-start items-center gap-2 mr-5 mb-4">
        <span className="text-2xl font-bold">لیست کاربران</span>
        <Users size={20} className="text-blue-500" />
      </div>

      {loadingUsers ? (
        <UserTableSkeleton />
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
