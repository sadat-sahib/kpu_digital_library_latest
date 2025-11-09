import React, { useState } from "react";
import BorrowTable from "../borrowTable/borrowTable";
import Swal from "sweetalert2";
import RequestDetails from "../borrowTable/borrowDetails";
import { BookA } from "lucide-react";
import {
  useGetActivatedUsersReserves,
  useDeleteActiveUsers,
} from "../../../config/client/DashBorrowApi.query";
import BorrowTableSkeleton from "../borrowTable/borrowTableSkeleton";

interface Request {
  id: number;
  book_title: string;
  book_author: string;
  book_code: string;
  book_status: string;
  remain_book: number;
  return_date: string;
  total_book: number;
  isbn: string;
  category: string;
  section: string;
  shelf: number;
  user_id: number;
  firstName: string;
  lastName: string;
  user_department: string;
  nic: string;
  nin: string;
  user_status: string;
}

const DashBorrows: React.FC = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [requestPerPage] = useState(10);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);

  const { data, isLoading, refetch } = useGetActivatedUsersReserves();
  const deleteMutation = useDeleteActiveUsers();

  const requests: Request[] = data ?? [];

  // const handleEdit = (id: number) => {
  //   console.log(`Editing request with id: ${id}`);
  // };

  const handleView = (id: number) => {
    const requestToView = requests.find((request) => request.id === id);
    if (requestToView) {
      setSelectedRequest(requestToView);
    }
  };

  const handleDelete = async (id: number) => {
    try {
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
        setLoadingDelete(id);

        await deleteMutation.mutateAsync(String(id));

        Swal.fire("حذف شد", "موفقانه حذف گردید.", "success");

        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to delete request", "error");
    } finally {
      setLoadingDelete(null);
    }
  };


  return (
    <div className="px-2 min-h-screen">
      {selectedRequest && (
        <RequestDetails
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
      <div className="flex justify-start items-center gap-2 mr-5">
        <span className="text-2xl font-bold"> کتاب های امانت گرفته شده </span>
        <BookA size={20} className="text-blue-500" />
      </div>

      {isLoading ? (
        <BorrowTableSkeleton />
      ) : (
        <>
          <BorrowTable
            requests={requests}
            onView={handleView}
            onDelete={handleDelete}
            loadingDelete={loadingDelete}
            refetchData={refetch}
             component="borrow"
          />
        </>
      )}
    </div>
  );
};

export default DashBorrows;
