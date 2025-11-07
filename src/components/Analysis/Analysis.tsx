import React from "react";
import StatsCard from "./StatsCard";
import BookAnalytics from "./BookAnalytics";
import TeacherAnalytics from "./TeacherAnalytics";
import StudentAnalytics from "./StudentAnalytics";
import { Book, BookAIcon, BookCheck, Users } from "lucide-react";
import { useGetDashboardStats } from "../../config/client/DashStateApi.query";

const Dashboard: React.FC = () => {
  const { data, isLoading, isError } = useGetDashboardStats();

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen text-center">
        در حال بارگذاری آمار...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen text-center text-red-500">
        خطا در دریافت آمار داشبورد!
      </div>
    );
  }

  const { user_stats, book_stats, reservation_stats } = data;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* --- Top Summary Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="مجموع کاربران"
          value={(user_stats.active_students + user_stats.deleted_students + user_stats.deactive_students).toLocaleString()}
          change="—"
          icon={<Users size={18} />}
        />
        <StatsCard
          title="مجموع کتاب ها"
          value={book_stats.total_books.toLocaleString()}
          change="—"
          icon={<Book size={18} />}
        />
        
        <StatsCard
          title="درخواست‌های در انتظار"
          value={reservation_stats.pending_reserves.toLocaleString()}
          change="—"
          icon={<BookAIcon size={18} />}
        />

        <StatsCard
          title="کتاب‌های امانت گرفته شده"
          value={reservation_stats.active_reserves.toLocaleString()}
          change="—"
          icon={<BookCheck size={18} />}
        />


      </div>

      {/* --- Charts / Analytics Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* <TeacherAnalytics /> */}
        <TeacherAnalytics userStats={user_stats} />

        <BookAnalytics bookStats={book_stats} />
        <StudentAnalytics userStats={user_stats} />
      </div>
    </div>
  );
};

export default Dashboard;
