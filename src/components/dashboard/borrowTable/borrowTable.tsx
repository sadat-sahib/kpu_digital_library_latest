// import { Check, CheckCircle, Loader, Trash, View } from "lucide-react";
// import React, { useState } from "react";

// import ReturnModal from "./returnModal";
// import ReceivedModal from "./receivedModal";
// import { useAddRequestBook, useAddReceivedBook } from "../../../config/client/DashBorrowApi.query";

// interface Request {
//   id: number;
//   book_title: string;
//   book_author: string;
//   book_code: string;
//   book_status: string;
//   remain_book: number;
//   return_date: string;
//   total_book: number;
//   isbn: string;
//   category: string;
//   section: string;
//   shelf: number;
//   user_id: number;
//   firstName: string;
//   lastName: string;
//   user_department: string;
//   nic: string;
//   nin: string;
//   user_status: string;
// }

// interface RequestTableProps {
//   requests: Request[];
//   onView: (id: number) => void;
//   onEdit: (id: number) => void;
//   onDelete: (id: number) => void;
//   onReceive: (id: number) => void;
//   loadingDelete: number | null;
//   component: string;
//   refetchData: () => void;
// }

// const BorrowTable: React.FC<RequestTableProps> = ({
//   requests,
//   onView,
//   onEdit,
//   onDelete,
//   loadingDelete,
//   component,
//   refetchData,
// }) => {

//   const [loadingActivating, setLoadingActivating] = useState<number | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [openReturnDateModal, setOpenReturnDateModal] = useState(false);
//   const [openReceiveModal, setOpenReceivedModal] = useState(false);
//   const [selectedRequestId, setSelectedRequestId] = useState<number | undefined>(undefined);
//   const [selectedReceivedId, setSelectedReceivedId] = useState<number | undefined>(undefined);

//   const addRequestBookMutation = useAddRequestBook();
//   const addReceivedBookMutation = useAddReceivedBook();

//   const handleClick = async (returnDate: string) => {
//     if (!selectedRequestId) return;
//     setLoadingActivating(selectedRequestId);

//     try {
//       await addRequestBookMutation.mutateAsync({
//         selectedRequestId: String(selectedRequestId),
//         returnDate,
//       });

//       setSuccessMessage(`Request ${selectedRequestId} activated successfully`);
//       refetchData?.();
//     } catch (error) {

//     } finally {
//       setLoadingActivating(null);
//       setTimeout(() => setSuccessMessage(null), 3000);
//     }
//   };

//   const handleReceive = async () => {
//     if (!selectedReceivedId) return;
//     setLoadingActivating(selectedReceivedId);

//     try {
//       await addReceivedBookMutation.mutateAsync(String(selectedReceivedId));

//       setSuccessMessage(`Request ${selectedReceivedId} received successfully`);
//       refetchData?.();
//     } catch (error) {
//       console.error("❌ Error receiving book:", error);
//     } finally {
//       setLoadingActivating(null);
//       setTimeout(() => setSuccessMessage(null), 3000);
//     }
//   };

//   return (
//     <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//       <table className="min-w-full table-auto">
//         <thead>
//           <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//             <th className="py-3 px-6 text-right">عنوان کتاب</th>
//             <th className="py-3 px-6 text-right">نویسنده</th>
//             <th className="py-3 px-6 text-right">نام امانت گیرنده</th>
//             <th className="py-3 px-6 text-right">تخلص امانت گیرنده</th>
//             <th className="py-3 px-6 text-center">عملیات</th>
//           </tr>
//         </thead>
//         <tbody className="text-gray-600 text-sm font-light">
//           {requests.map((request) => (
//             <tr
//               key={request.id}
//               className="border-b border-gray-200 hover:bg-gray-100"
//             >
//               <td className="py-3 px-6 text-right whitespace-nowrap">
//                 <div className="font-medium">{request.book_title}</div>
//               </td>
//               <td className="py-3 px-6 text-right whitespace-nowrap">
//                 <div className="font-medium">{request.book_author}</div>
//               </td>
//               <td className="py-3 px-6 text-right">{request.firstName}</td>
//               <td className="py-3 px-6 text-right">{request.lastName}</td>
//               <td className="py-3 px-6 text-center">
//                 <div className="flex item-center justify-center">

//                   {component === "Requests" && (
//                     <button
//                       className="p-1 hover:bg-gray-300 rounded-md text-blue-500 hover:text-blue-700"
//                       onClick={() => {
//                         setSelectedRequestId(request.id);
//                         setOpenReturnDateModal(true);
//                       }}
//                       disabled={loadingActivating === request.id}
//                     >
//                       {loadingActivating === request.id ? (
//                         <Loader size={20} className="animate-spin text-blue-600" />
//                       ) : (
//                         <CheckCircle height={20} width={20} />
//                       )}
//                     </button>
//                   )}

//                   {component === "borrow" && (
//                     <button
//                       className="p-1 hover:bg-gray-300 rounded-md text-blue-500 hover:text-blue-700"
//                       onClick={() => {
//                         setSelectedReceivedId(request.id);
//                         setOpenReceivedModal(true);
//                       }}
//                       disabled={loadingActivating === request.id}
//                     >
//                       {loadingActivating === request.id ? (
//                         <Loader size={20} className="animate-spin text-blue-600" />
//                       ) : (
//                         <CheckCircle height={20} width={20} />
//                       )}
//                     </button>
//                   )}

//                   <button
//                     onClick={() => onView(request.id)}
//                     className="w-8 h-8 mr-2 transform text-green-400 hover:text-green-500 hover:scale-110 flex items-center justify-center"
//                   >
//                     <View height={20} width={20} />
//                   </button>

//                   {component === "R" && (
//                     <button
//                       onClick={() => onEdit(request.id)}
//                       className="w-8 h-8 mr-2 transform text-blue-400 hover:text-blue-500 hover:scale-110 flex items-center justify-center"
//                     >
//                       <Check height={20} width={20} />
//                     </button>
//                   )}

//                   {component === "Requests" && (
//                     <button
//                       onClick={() => onDelete(request.id)}
//                       className="w-8 h-8 mr-2 transform text-red-400 hover:text-red-500 hover:scale-110 flex items-center justify-center"
//                       disabled={loadingDelete === request.id}
//                     >
//                       {loadingDelete === request.id ? (
//                         <Loader size={20} className="animate-spin text-red-600" />
//                       ) : (
//                         <Trash height={20} width={20} />
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {openReturnDateModal && (
//         <ReturnModal
//           closeModal={() => setOpenReturnDateModal(false)}
//           onSubmit={handleClick}
//         />
//       )}

//       {openReceiveModal && (
//         <ReceivedModal
//           closeModal={() => setOpenReceivedModal(false)}
//           onSubmit={handleReceive}
//         />
//       )}

//       {successMessage && (
//         <div className="mt-4 text-green-500 text-center">{successMessage}</div>
//       )}
//     </div>
//   );
// };

// export default BorrowTable;

import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { View, Trash2, Loader, CheckCircle } from "lucide-react";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ReturnModal from "./returnModal";
import ReceivedModal from "./receivedModal";
import {
  useAddRequestBook,
  useAddReceivedBook,
} from "../../../config/client/DashBorrowApi.query";
import { toJalaliPersian } from "../../../utils/dateUtils";

interface Request {
  id: number;
  book_title: string;
  book_author: string;
  return_date: string;
  firstName: string;
  lastName: string;
  user_department: string;
  nic: string;
  nin: string;
}

interface BorrowTableProps {
  requests: Request[];
  onView: (id: number) => void;
  onDelete: (id: number) => void;
  loadingDelete?: number | null;
  refetchData?: () => void;
  component?: string; // "Requests" | "borrow"
}

const BorrowTable: React.FC<BorrowTableProps> = ({
  requests,
  onView,
  onDelete,
  loadingDelete,
  refetchData,
  component,
}) => {
  const [filterText, setFilterText] = useState("");
  const [loadingActivating, setLoadingActivating] = useState<number | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openReturnDateModal, setOpenReturnDateModal] = useState(false);
  const [openReceiveModal, setOpenReceiveModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<
    number | undefined
  >(undefined);
  const [selectedReceivedId, setSelectedReceivedId] = useState<
    number | undefined
  >(undefined);

  const addRequestBookMutation = useAddRequestBook();
  const addReceivedBookMutation = useAddReceivedBook();

  const handleClick = async (returnDate: string) => {
    if (!selectedRequestId) return;
    setLoadingActivating(selectedRequestId);

    try {
      await addRequestBookMutation.mutateAsync({
        selectedRequestId: String(selectedRequestId),
        returnDate,
      });

      setSuccessMessage(`Request ${selectedRequestId} activated successfully`);
      refetchData?.();
    } catch (error) {
      console.error("❌ Error activating request:", error);
    } finally {
      setLoadingActivating(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  
  const handleReceive = async () => {
    if (!selectedReceivedId) return;
    setLoadingActivating(selectedReceivedId);

    try {
      await addReceivedBookMutation.mutateAsync(String(selectedReceivedId));

      setSuccessMessage(`Request ${selectedReceivedId} received successfully`);
      // refetchData?.();
    } catch (error) {
      console.error("❌ Error receiving book:", error);
    } finally {
      setLoadingActivating(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  
  const filteredRequests = requests.filter(
    (req) =>
      req.book_title.toLowerCase().includes(filterText.toLowerCase()) ||
      req.book_author.toLowerCase().includes(filterText.toLowerCase()) ||
      req.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
      req.lastName.toLowerCase().includes(filterText.toLowerCase())
  );

  
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(requests);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "BorrowedBooks");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "borrowed_books.xlsx");
  };

 
  const columns: TableColumn<Request>[] = [
    {
      name: "عنوان کتاب",
      selector: (row) => row.book_title,
      sortable: true,
      grow: 2,
    },
    {
      name: "نویسنده",
      selector: (row) => row.book_author,
      sortable: true,
    },
    {
      name: "نام کاربر",
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
      grow: 1.5,
    },
    {
      name: "دیپارتمنت",
      selector: (row) => row.user_department,
      sortable: true,
    },
    {
      name: "تاریخ بازگشت",
      selector: (row) => toJalaliPersian(row.return_date),
      sortable: true,
    },
    {
      name: "عملیات",
      cell: (row) => (
        <div className="flex items-center justify-center gap-3">
          
          {component === "Requests" && (
            <button
              className="p-1 rounded-md text-blue-500 hover:text-blue-700 hover:bg-gray-100"
              onClick={() => {
                setSelectedRequestId(row.id);
                setOpenReturnDateModal(true);
              }}
              disabled={loadingActivating === row.id}
              title="تایید درخواست"
            >
              {loadingActivating === row.id ? (
                <Loader size={18} className="animate-spin text-blue-600" />
              ) : (
                <CheckCircle size={18} />
              )}
            </button>
          )}

          {component === "borrow" && (
            <button
              className="p-1 rounded-md text-blue-500 hover:text-blue-700 hover:bg-gray-100"
              onClick={() => {
                setSelectedReceivedId(row.id);
                setOpenReceiveModal(true);
              }}
              disabled={loadingActivating === row.id}
              title="تحویل کتاب"
            >
              {loadingActivating === row.id ? (
                <Loader size={18} className="animate-spin text-blue-600" />
              ) : (
                <CheckCircle size={18} />
              )}
            </button>
          )}

          <button
            onClick={() => onView(row.id)}
            className="text-green-600 hover:text-green-700"
            title="مشاهده جزئیات"
          >
            <View size={18} />
          </button>

          <button
            onClick={() => onDelete(row.id)}
            disabled={loadingDelete === row.id}
            className="text-red-500 hover:text-red-600"
            title="حذف"
          >
            {loadingDelete === row.id ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              <Trash2 size={18} />
            )}
          </button>
        </div>
      ),
      center: true,
      width: "160px",
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "700",
        backgroundColor: "#f3f4f6",
      },
    },
    cells: { style: { fontSize: "14px" } },
  };

  const SubHeader = (
    <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 px-3 py-3 rounded-lg shadow-sm">
      <input
        type="text"
        placeholder="جستجو..."
        className="border border-gray-300 rounded-full py-2 px-4 w-72"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <div className="flex gap-2">
        <CSVLink
          data={requests}
          filename="borrowed_books.csv"
          className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600"
        >
          📄 CSV
        </CSVLink>
        <button
          onClick={exportExcel}
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
        >
          📘 Excel
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
      <DataTable
        columns={columns}
        data={filteredRequests}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 20, 50]}
        highlightOnHover
        striped
        responsive
        subHeader
        subHeaderComponent={SubHeader}
        persistTableHead
        noDataComponent="هیچ کتابی یافت نشد"
        customStyles={customStyles}
      />

      {/* 🧩 Modals */}
      {openReturnDateModal && (
        <ReturnModal
          closeModal={() => setOpenReturnDateModal(false)}
          onSubmit={handleClick}
        />
      )}

      {openReceiveModal && (
        <ReceivedModal
          closeModal={() => setOpenReceiveModal(false)}
          onSubmit={handleReceive}
        />
      )}

      {successMessage && (
        <div className="mt-4 text-green-500 text-center">{successMessage}</div>
      )}
    </div>
  );
};

export default BorrowTable;
