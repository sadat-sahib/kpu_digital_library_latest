import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import DashProfile from "../../components/Dashboard/DashProfile";
import DashBooks from "../../components/dashboard/books/dashBooks";
import DashUsers from "../../components/dashboard/users/dashUsers";
import DashBookRegistration from "../../components/dashboard/books/dashBookRegistration";
import DashboardComp from "../../components/Dashboard/DashboardComp";
import DashDeActiveUsers from "../../components/dashboard/users/dashDeActiveUsers";
import DashActiveUsers from "../../components/dashboard/users/dashActiveUsers";
import DashFaculty from "../../components/dashboard/faculty/dashFaculty";
import DashDepartment from "../../components/Dashboard/department/DashDepartment";
import DashSectionRegistration from "../../components/Dashboard/section/DashSectionRegistration";
import DashCategoryRegistration from "../../components/Dashboard/category/DashCategoryRegistration";
import UserRegistration from "../../Pages/UserRegistration";
import DashDeActiveEmp from "../../components/dashboard/employee/dashDeactiveEmp";
import DashActiveEmp from "../../components/dashboard/employee/dashActiveEmp";
import DashEmp from "../../components/dashboard/employee/dashEmp";
import DashReservedBooks from "../../components/dashboard/books/dashReservedBooks";
import DashReserves from "../../components/dashboard/borrow/dashBorrows";
import DashRequests from "../../components/dashboard/borrow/dashRequests";
const DashReturned: React.FC = () => {
  return <div>Returned Books</div>;
};

import Teachers from "../../components/dashboard/users/teachers";
import Admin from "../../Components/Dashboard/admin/admin";
import StudentsReport from "../../components/dashboard/reports/StudentsReport";
import BooksReport from "../../components/dashboard/reports/BooksReport";
import BorrowsReport from "../../components/dashboard/reports/BorrowsReport";
import UpdateUser from "../../components/dashboard/users/dashUpdateUser";

const DashboardContent: React.FC = () => {
  const location = useLocation();
  const [tab, setTab] = useState("dashboard");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="p-2 text-right">
      {/* Profile... */}
      {tab === "profile" && <DashProfile />}
      {/* Books */}
      {tab === "books" && <DashBooks />}
      {/* Reserved Books */}
      {tab === "reserve-books" && <DashReservedBooks />}
      {/* Borrow */}
      {tab === "borrow" && <DashReserves />}
      {/* Requests */}
      {tab === "requests" && <DashRequests />}
      {/* Returned books */}
      {tab === "returned-books" && <DashReturned />}
      {/* Users */}
      {tab === "users" && <DashUsers />}
      {/* Monographs */}
      {/* {tab === "monographs" && <DashMonographs />} */}
      {/* Articles */}
      {/* {tab === "articles" && <DashArticles />} */}
      {/* Articles */}
      {tab === "book-registration" && <DashBookRegistration />}
      {/* Dashboard comp */}
      {tab === "dashboard" && <DashboardComp />}
      {/* All employee */}
      {tab === "employees" && <DashEmp />}
      {/* DeActive users */}
      {tab === "deactive-users" && <DashDeActiveUsers />}
      {/* DeActive employees */}
      {tab === "deactive-employees" && <DashDeActiveEmp />}
      {/* Active employees */}
      {tab === "active-employees" && <DashActiveEmp />}
      {/* Teachers list */}
      {tab === "teachers-list" && <Teachers />}
      {/* Admin list */}
      {tab === "admin-list" && <Admin />}
      {/* Active users */}
      {tab === "active-users" && <DashActiveUsers />}
      {/* Register users */}
      {tab === "user-registration" && <UserRegistration />}
      {/* update user */}
      {tab === "user-update" && <UpdateUser userId={0} />}
      {/* Faculty */}
      {tab === "faculty" && <DashFaculty />}
      {/* Department */}
      {tab === "department" && <DashDepartment />}
      {/* Section */}
      {tab === "section" && <DashSectionRegistration />}
      {/* Category */}
      {tab === "category" && <DashCategoryRegistration />}
      {/* Student Report */}
      {tab === "student-report" && <StudentsReport />}
      {/* Books Report */}
      {tab === "book-report" && <BooksReport />}
      {/* Borrow Report */}
      {tab === "borrow-books" && <BorrowsReport />}
      {tab === "borrow-report" && <BorrowsReport />}
    </div>
  );
};

export default DashboardContent;
