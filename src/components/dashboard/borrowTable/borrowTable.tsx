
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
