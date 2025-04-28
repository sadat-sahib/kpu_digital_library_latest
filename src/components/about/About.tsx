// import React from "react";
// import "tailwindcss/tailwind.css";

// const About = () => {
//   return (
//     <div className="bg-gray-50 text-gray-800 min-h-screen p-6 animate-fade-in">
//       <div className="max-w-7xl mx-auto text-center">
//         {/* Single Image Section */}
//         <div className="mb-8">
//           <img
//             src="/library.jpg" // تغییر این آدرس به مسیر تصویر مورد نظر
//             alt="Library Image"
//             className="w-full h-96 object-cover rounded-md shadow-lg"
//           />
//         </div>

//         {/* About Text Section */}
//         <div className="text-center">
//           <h2 className="text-3xl font-bold mb-6">کتابخانه پوهنتون پولیتخنیک کابل</h2>
//           <p className="leading-relaxed text-lg mx-auto mb-6 max-w-3xl">
//             کتابخانه ما مکانی الهام‌بخش برای مطالعه و تحقیق است. در اینجا به
//             بهترین منابع علمی دسترسی دارید. ما به ارائه خدمات با کیفیت بالا
//             متعهد هستیم و امیدواریم محیطی ایده‌آل برای یادگیری شما فراهم
//             کنیم. کتابخانه ما منابعی متنوع از کتاب‌ها و مقالات علمی را برای
//             علاقه‌مندان به مطالعات مختلف فراهم کرده است.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;
// import React from "react";
// import "tailwindcss/tailwind.css";

// const About = () => {
//   return (
//     <div className="bg-gray-50 text-gray-800 min-h-screen p-6 animate-fade-in">
//       <div className="max-w-7xl mx-auto text-center">
//         {/* Single Image Section */}
//         <div className="mb-8">
//           <img
//             src="/library.jpg" // تغییر این آدرس به مسیر تصویر مورد نظر
//             alt="Library Image"
//             className="w-full h-96 object-cover rounded-md shadow-lg"
//           />
//         </div>

//         {/* About Text Section */}
//         <div className="text-center">
//           <h2 className="text-3xl font-bold mb-6">کتابخانه پوهنتون پولیتخنیک کابل</h2>
//           <p className="leading-relaxed text-lg mx-auto mb-6 max-w-3xl">
//             کتابخانه ما مکانی الهام‌بخش برای مطالعه و تحقیق است. در اینجا به
//             بهترین منابع علمی دسترسی دارید. ما به ارائه خدمات با کیفیت بالا
//             متعهد هستیم و امیدواریم محیطی ایده‌آل برای یادگیری شما فراهم
//             کنیم. کتابخانه ما منابعی متنوع از کتاب‌ها و مقالات علمی را برای
//             علاقه‌مندان به مطالعات مختلف فراهم کرده است.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

import {
  Book,
  Users,
  GraduationCap,
  BookOpen,
  Award,
  Globe,
} from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
const historyData = [
  {
    year: "۱۳۸۴",
    title: "تاسیس",
    description:
      "به عنوان یک پروژه آزمایشی با ۱۰،۰۰۰ کتاب و مجله دیجیتالی برای پشتیبانی از برنامه‌های آموزش از راه دور تاسیس شد.",
    position: "right",
  },
  {
    year: "۱۳۸۹",
    title: "گسترش",
    description:
      "مجموعه را برای شامل منابع چندرسانه‌ای، مقالات تحقیقاتی و مشارکت با ۵۰ دانشگاه در سراسر جهان گسترش دادیم.",
    position: "left",
  },
  {
    year: "۱۳۹۴",
    title: "نوآوری",
    description:
      "راه‌اندازی اپلیکیشن‌های موبایل، ابزارهای یادگیری تعاملی و دستیاران تحقیقاتی مبتنی بر هوش مصنوعی.",
    position: "right",
  },
  {
    year: "۱۴۰۲",
    title: "زمان حال",
    description:
      "اکنون به بیش از ۵۰،۰۰۰ کاربر فعال با ۲ میلیون منبع دیجیتال و ابزارهای پیشرفته تحقیقاتی خدمات ارائه می‌دهیم.",
    position: "left",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          درباره کتابخانه دیجیتال ما
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          توانمندسازی آموزش از طریق دسترسی به دانش و منابع دیجیتال نوآورانه از
          سال ۱۳۸۴.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">ماموریت ما</h2>
          <p className="text-muted-foreground mb-4">
            کتابخانه دیجیتال دانشگاه متعهد به ارائه دسترسی عادلانه به دانش و
            تقویت اکتشافات فکری برای دانشجویان، اساتید و محققان در سراسر جهان
            است.
          </p>
          <p className="text-muted-foreground mb-4">
            ما تلاش می‌کنیم تا محیطی دیجیتال و فراگیر ایجاد کنیم که از سبک‌های
            مختلف یادگیری پشتیبانی کند، تعالی علمی را ترویج دهد و منابع علمی را
            برای نسل‌های آینده حفظ کند.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Book className="h-6 w-6 text-primary" color="blue"/>
              </div>
              <h3 className="text-xl font-bold">۲ هزار +</h3>
              <p className="text-sm text-muted-foreground">منابع دیجیتال</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Users className="h-6 w-6 text-primary" color="blue"/>
              </div>
              <h3 className="text-xl font-bold">۴۰۰ +</h3>
              <p className="text-sm text-muted-foreground">کاربران فعال</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <GraduationCap className="h-6 w-6 text-primary" color="blue"/>
              </div>
              <h3 className="text-xl font-bold">۱۲۰+</h3>
              <p className="text-sm text-muted-foreground">موسسات همکار</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Globe className="h-6 w-6 text-primary" color="blue"/>
              </div>
              <h3 className="text-xl font-bold">۱۹۰+</h3>
              <p className="text-sm text-muted-foreground">کشورهای تحت پوشش</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-lg"></div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-lg"></div>
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img
              src="/1.jpg"
              alt="کتابخانه دیجیتال دانشگاه"
              width={800}
              height={600}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mb-20">
  <h2 className="text-3xl font-bold text-center mb-12">تاریخچه ما</h2>
  <div className="relative">
    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-muted"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {historyData.map((item, index) => (
        <div
          key={index}
          className={`relative mt-8 md:mt-24 ${
            item.position === "right" ? "md:col-start-1" : "md:col-start-2"
          }`}
        >
          <div
            className={`absolute top-6 w-4 h-4 rounded-full bg-blue-500 z-10 ${
              item.position === "right"
                ? "right-0 transform translate-x-1/2"
                : "left-0 transform -translate-x-1/2"
            }`}
          ></div>
          <Card
            className={`shadow-md ${
              item.position === "right" ? "md:mr-8" : "md:ml-8"
            }`}
          >
            <CardHeader>
              <CardTitle>{item.year}</CardTitle>
              <CardDescription>{item.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  </div>
</div>


      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">خدمات ما</h2>
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="students">برای دانشجویان</TabsTrigger>
            <TabsTrigger value="faculty">برای اساتید</TabsTrigger>
            <TabsTrigger value="researchers">برای محققان</TabsTrigger>
          </TabsList>
          <TabsContent value="students" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-primary mb-2" color="blue" />
                  <CardTitle>کتاب‌های درسی دیجیتال</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    دسترسی به هزاران کتاب درسی در تمام رشته‌ها، با قابلیت‌های
                    برجسته‌سازی، یادداشت‌برداری و همکاری.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Award className="h-8 w-8 text-primary mb-2" color="blue" />
                  <CardTitle>منابع مطالعاتی</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    آزمون‌های تمرینی، راهنماهای مطالعه و ماژول‌های یادگیری
                    تعاملی برای کمک به موفقیت شما در دروس.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" color="blue" />
                  <CardTitle>همکاری با همتایان</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    اتاق‌های مطالعه مجازی، انجمن‌های گفتگو و ابزارهای پروژه
                    گروهی برای ارتباط با همکلاسی‌ها.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="faculty" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <GraduationCap className="h-8 w-8 text-primary mb-2" color="blue" />
                  <CardTitle>مواد درسی</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    ایجاد و توزیع بسته‌های درسی دیجیتال، فهرست‌های مطالعاتی و
                    محتوای چندرسانه‌ای برای دانشجویان.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Book className="h-8 w-8 text-primary mb-2" color="blue" />
                  <CardTitle>پشتیبانی انتشارات</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    ابزارها و منابعی برای کمک به انتشار و اشتراک‌گذاری کارهای
                    علمی شما با جامعه گسترده‌تر.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" color="blue" />
                  <CardTitle>منابع آموزشی</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    مواد آموزشی، طرح‌های درس و ابزارهای ارزیابی برای افزایش
                    اثربخشی تدریس شما.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="researchers" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Globe className="h-8 w-8 text-primary mb-2" color="blue" />
                  <CardTitle>پایگاه‌های داده جهانی</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    دسترسی به پایگاه‌های داده تحقیقاتی، مجلات و انتشارات برتر از
                    سراسر جهان.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Award className="h-8 w-8 text-primary mb-2" color="blue" />
                  <CardTitle>تحلیل داده</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    ابزارهای پیشرفته برای تجسم داده، تحلیل آماری و همکاری
                    تحقیقاتی.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Book className="h-8 w-8 text-primary mb-2" color="blue" />
                  <CardTitle>دسترسی به آرشیو</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    اسناد تاریخی دیجیتالی، نسخه‌های خطی نادر و مجموعه‌های ویژه
                    برای تحقیقات منبع اولیه.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">تیم ما</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "دکتر سارا جهانی",
              role: "مدیر کتابخانه",
              image: "/1.jpg",
            },
            {
              name: "پروفسور محمد حسینی",
              role: "مسئول مجموعه‌های دیجیتال",
              image: "/1.jpg",
            },
            {
              name: "دکتر آزاده پارسا",
              role: "خدمات پژوهشی",
              image: "/1.jpg",
            },
            {
              name: "جواد نادری",
              role: "مدیر فنی",
              image: "/1.jpg",
            },
          ].map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="object-cover h-full w-full rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div> */}

      <div className="bg-muted/30 rounded-xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">به جامعه ما بپیوندید</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            بخشی از جامعه در حال رشد یادگیرندگان، مدرسان و محققان ما شوید. با
            هم، ما در حال ساختن آینده آموزش دیجیتال هستیم.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            تماس با ما
          </a>
          {/* <a
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            اطلاعات بیشتر
          </a> */}
        </div>
      </div>
    </div>
  );
}
