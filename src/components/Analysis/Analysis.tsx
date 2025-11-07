import React from "react";
import StatsCard from "./StatsCard";
import BookAnalytics from "./BookAnalytics";
import TeacherAnalytics from "./TeacherAnalytics";
import StudentAnalytics from "./StudentAnalytics";
import { Book, BookA, BookAIcon, BookCheck, Users } from "lucide-react";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard title="مجموع کاربران" value="40,689" change="8.5%" icon={<Users size={18}/>} />
        <StatsCard title="مجموع کتاب ها" value="10,293" change="1.3%" icon={<Book size={18}/>} />
        <StatsCard title="کتاب ها درخواست شده" value="89,000" change="-4.3%" icon={<BookAIcon size={18}/>} />
        <StatsCard title="کتاب های ثبت شده" value="2,040" change="1.8%" icon={<BookCheck size={18}/>} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TeacherAnalytics />
         <BookAnalytics />
        <StudentAnalytics />
      </div>
    </div>
  );
};

export default Dashboard;
