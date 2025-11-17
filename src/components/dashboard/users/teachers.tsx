import React, { useEffect, useState } from "react";
import axios from "../../../axiosInstance";
import Swal from "sweetalert2";
import UserDetails from "../userTable/userDetails";
import UserTable from "../userTable/userTable";
import UserRegistration from "../../../Pages/UserRegistration";
import { Loader } from "lucide-react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  current_residence: string;
  original_residence: string;
  phone: string;
  type: string;
  department: string;
  faculty: string;
  nic: string;
  nin: string;
}

const Teachers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, _setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, _setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [reload, _setReload] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [reload]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/dashboard/users/activated_teachers", {
        withCredentials: true
      });
      setUsers(response.data.data);
      console.log(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: number) => {
    setEditingUserId(id);
  };
  const handleView = (id: number) => {
    const userToView = users.find((user) => user.id === id);
    if (userToView) {
      setSelectedUser(userToView);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "آیا مطمعن هستید؟",
        text: "دیتای هذف شده قابل بازیافت نمیباشد!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "نخیر",
        confirmButtonText: "بلی",
      });

      if (result.isConfirmed) {
        setLoadingDelete(id);
        axios.delete(`/api/dashboard/users/destroy/${id}`, {
          withCredentials: true
        });
        setUsers(users.filter((user) => user.id !== id));
        Swal.fire("حذف شد", "موفقانه حذف گردید.", "success");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire("Error", "Failed to delete user", "error");
    } finally {
      setLoadingDelete(null);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (editingUserId !== null) {
    return <UserRegistration userId={editingUserId} />;
  }

  // Pagination
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

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader size={32} className="animate-spin text-blue-600" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <UserTable
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

export default Teachers;