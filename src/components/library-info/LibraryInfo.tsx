import {
  BookMarked,
  Calendar,
  ChevronLeft,
  Clock,
  GraduationCap,
  LibraryBig,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import React from "react";
import { Link } from "react-router-dom";

export default function LibraryInfo() {
  return (
    <section className="py-16 bg-muted/30 px-4">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Info */}
          <div>
            <h6 className="text-primary font-medium mb-2">
              درباره کتابخانه ما
            </h6>
            <h2 className="text-3xl font-bold mb-6">
              کتابخانه دیجیتال پوهنتون
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              کتابخانه دیجیتال دانشگاه با هدف تسهیل دسترسی به منابع علمی و
              آموزشی برای دانشجویان، اساتید و پژوهشگران ایجاد شده است. این
              کتابخانه با بیش از ۱۰۰,۰۰۰ منبع علمی در رشته‌های مختلف، امکان
              دسترسی به جدیدترین مقالات، کتاب‌ها و پایان‌نامه‌ها را فراهم
              می‌کند.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="rounded-full p-2 bg-primary/10 text-primary">
                  <LibraryBig className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">منابع متنوع</h4>
                  <p className="text-sm text-muted-foreground">
                    دسترسی به بیش از ۱۰۰,۰۰۰ منبع علمی
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full p-2 bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">دسترسی ۲۴ ساعته</h4>
                  <p className="text-sm text-muted-foreground">
                    امکان استفاده در هر زمان و مکان
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full p-2 bg-primary/10 text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">پشتیبانی کارشناسان</h4>
                  <p className="text-sm text-muted-foreground">
                    راهنمایی توسط متخصصان کتابداری
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full p-2 bg-primary/10 text-primary">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">منابع آموزشی</h4>
                  <p className="text-sm text-muted-foreground">
                    دسترسی به کتاب‌ها و جزوات درسی
                  </p>
                </div>
              </div>
            </div>

            <Button className="gap-2 bg-blue-500 hover:bg-blue-600">
              <Link to={'/about'}>اطلاعات بیشتر</Link>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* Right Column - Hours & Stats */}
          <div className="space-y-8">
            {/* Hours Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">ساعات کاری کتابخانه</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">شنبه تا چهارشنبه</span>
                    <span>۸:۰۰ الی ۱۸:۰۰</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">پنج‌شنبه</span>
                    <span>۸:۰۰ الی ۱۴:۰۰</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">جمعه و تعطیلات رسمی</span>
                    <span>تعطیل</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-blue-500 text-primary-foreground w-full h-36">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <BookMarked className="h-10 w-10 mb-3" />
                  <span className="text-3xl font-bold">۱۰۰,۰۰۰+</span>
                  <span className="text-sm">منابع علمی</span>
                </CardContent>
              </Card>

              <Card className="bg-yellow-400 w-full h-36">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <Users className="h-10 w-10 mb-3" />
                  <span className="text-3xl font-bold">۵۰,۰۰۰+</span>
                  <span className="text-sm">کاربر فعال</span>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
