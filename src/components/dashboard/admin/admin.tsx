import React from "react";
import { useEffect, useState } from "react";
import { AddAdmin } from "./addAdmin";
import { AdminTable } from "./adminTable";
import axios from "../../../axiosInstance";
import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";
import { Loader } from "lucide-react";
import Swal from "sweetalert2";

interface Admin {
  id: number;
  name: string;
  email: string;
}

const Admin: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const { token, type } = useAdminAuthStore();
  const [loading, setLoading] = useState<boolean>(true);
  console.log("Type: ", type);
  useEffect(() => {
    setLoading(true);
    console.log(type);
    axios
      .get("/api/dashboard/admin/account/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setAdmins(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching admins:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const handleAddAdmin = (newAdmin: { name: string; email: string }) => {
    const admin: Admin = {
      ...newAdmin,
      id: admins.length + 1,
    };
    setAdmins([...admins, admin]);
  };

  const handleDeleteAdmin = async(id: number) => {
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
          setLoading(true);
          // Implement delete functionality
          await new Promise((resolve) => setTimeout(resolve, 1000));
          axios.post(`/api/dashboard/admin/account/delete/employee/${id}`,{}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setAdmins(admins.filter((admin) => admin.id !== id));
          Swal.fire("حذف شد", "موفقانه حذف گردید.", "success");
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        Swal.fire("Error", "Failed to delete book", "error");
      } finally {
        setLoading(false);
      }
    };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        {type === "assistant" && (
          <div className="w-full">
            <AddAdmin onAddAdmin={handleAddAdmin} />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold mb-4">لیست ادمین</h2>
          {loading ? (
            <Loader className="animate-spin text-blue-600 m-auto" size={30} />
          ) : (
            <AdminTable admins={admins} onDeleteAdmin={handleDeleteAdmin} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Admin;
