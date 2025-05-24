import React, { useEffect, useState } from "react";
import axios from "../../../axiosInstance";
import { FaSearch } from "react-icons/fa";
import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";
import Swal from "sweetalert2";
import Pagination from "../pagination/pagination";
import UserTable from "../userTable/userTable";
import UserDetails from "../userTable/userDetails";
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

interface Faculty {
  id: number;
  name: string;
}

const DashActiveUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [reload, setReload] = useState(false);
  const { token } = useAdminAuthStore();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const refetchData = () => {
    setReload(!reload);
  };

  useEffect(() => {
    fetchUsers();
    fetchFaculties();
  }, [reload]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "/api/dashboard/users/activated_students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFaculties = async () => {
    try {
      const response = await axios.get("/api/dashboard/faculties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFaculties(response.data.data);
    } catch (error) {
      console.error("Error fetching faculties:", error);
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
        await axios.delete(`/api/dashboard/users/destroy/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFaculty(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    const matchesFaculty = selectedFaculty === "" || user.faculty === selectedFaculty;
    
    return matchesSearch && matchesFaculty;
  });

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">کاربران فعال</h1>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
          <div className="w-full md:w-48">
            <select
              value={selectedFaculty}
              onChange={handleFacultyChange}
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">همه دانشکده ها</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.name}>
                  {faculty.name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="جستجو..."
              className="w-full bg-white border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

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
            refetchData={refetchData}
          />
          <Pagination
            currentPage={currentPage}
            totalItems={filteredUsers.length}
            itemsPerPage={usersPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default DashActiveUsers;