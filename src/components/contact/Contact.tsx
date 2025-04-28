// import { Card, CardHeader, CardContent } from "../ui/card";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { Textarea } from "../ui/textarea";
// import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";
// import "tailwindcss/tailwind.css";
// import React from "react";

// const Contact = () => {
//   return (
//     <div className="min-h-screen  flex items-center justify-center py-10 animate-fade-in">
//       <Card className="w-full max-w-5xl ">
//         <CardHeader className="">
//           <h6 className="text-2xl font-semibold text-center text-gray-800">ما مشتاق شنیدن نظرات شما هستیم</h6>
//           <p className="text-center text-gray-500 mt-2">اگر سوالی دارید یا نیاز به همکاری دارید، پیام خود را برای ما ارسال کنید.</p>
//         </CardHeader>
//         <CardContent className="flex flex-col lg:flex-row w-full">
//           {/* Contact Information */}
//           <div className="space-y-6 w-full lg:w-1/2">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">آدرس</h2>
//               <p className="text-gray-600 flex items-center mt-2">
//                 <MapPin className="w-5 h-5 text-gray-500 mr-2" />
//                 کارته مامورین، پوهنتون پولی تخنیک
//               </p>
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">اطلاعات تماس</h2>
//               <p className="text-gray-600 flex items-center mt-2">
//                 <Phone className="w-5 h-5 text-gray-500 mr-2" />
//                 +93 (0) 78 595 504
//               </p>
//               <p className="text-gray-600 flex items-center mt-2">
//                 <Mail className="w-5 h-5 text-gray-500 mr-2" />
//                 info@example.com
//               </p>
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">رسانه‌های اجتماعی</h2>
//               <div className="flex space-x-4 mt-2">
//                 <a href="#" className="text-gray-600 hover:text-blue-600 transition">
//                   <Facebook  size={20}/>
//                 </a>
//                 <a href="#" className="text-gray-600 hover:text-pink-500 transition">
//                   <Instagram  size={20}/>
//                 </a>
//                 <a href="#" className="text-gray-600 hover:text-blue-400 transition">
//                   <Twitter  size={20}/>
//                 </a>
//               </div>
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">ساعات کاری</h2>
//               <p className="text-gray-600 mt-2">شنبه تا پنج‌شنبه: 8 صبح تا 4 عصر</p>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <form className="space-y-6 w-full lg:w-1/2 p-6 rounded-lg">
//             <div className="flex flex-col lg:flex-row lg:gap-3">
//               <div className="w-full lg:w-1/2">
//                 <label htmlFor="name" className="block text-gray-700 font-medium">نام</label>
//                 <Input
//                   id="name"
//                   placeholder="نام شما"
//                   className="mt-1 border-gray-300 focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="w-full lg:w-1/2">
//                 <label htmlFor="email" className="block text-gray-700 font-medium">ایمیل</label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="ایمیل شما"
//                   className="mt-1 border-gray-300 focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="message" className="block text-gray-700 font-medium">پیام</label>
//               <Textarea
//                 id="message"
//                 placeholder="پیام خود را اینجا بنویسید"
//                 className="mt-1 border-gray-300 focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-blue-600 text-white font-semibold py-2 hover:bg-blue-700 transition-all"
//             >
//               ارسال پیام
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Contact;
// import { Card, CardHeader, CardContent } from "../ui/card";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { Textarea } from "../ui/textarea";
// import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";
// import "tailwindcss/tailwind.css";
// import React from "react";

// const Contact = () => {
//   return (
//     <div className="min-h-screen  flex items-center justify-center py-10 animate-fade-in">
//       <Card className="w-full max-w-5xl ">
//         <CardHeader className="">
//           <h6 className="text-2xl font-semibold text-center text-gray-800">ما مشتاق شنیدن نظرات شما هستیم</h6>
//           <p className="text-center text-gray-500 mt-2">اگر سوالی دارید یا نیاز به همکاری دارید، پیام خود را برای ما ارسال کنید.</p>
//         </CardHeader>
//         <CardContent className="flex flex-col lg:flex-row w-full">
//           {/* Contact Information */}
//           <div className="space-y-6 w-full lg:w-1/2">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">آدرس</h2>
//               <p className="text-gray-600 flex items-center mt-2">
//                 <MapPin className="w-5 h-5 text-gray-500 mr-2" />
//                 کارته مامورین، پوهنتون پولی تخنیک
//               </p>
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">اطلاعات تماس</h2>
//               <p className="text-gray-600 flex items-center mt-2">
//                 <Phone className="w-5 h-5 text-gray-500 mr-2" />
//                 +93 (0) 78 595 504
//               </p>
//               <p className="text-gray-600 flex items-center mt-2">
//                 <Mail className="w-5 h-5 text-gray-500 mr-2" />
//                 info@example.com
//               </p>
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">رسانه‌های اجتماعی</h2>
//               <div className="flex space-x-4 mt-2">
//                 <a href="#" className="text-gray-600 hover:text-blue-600 transition">
//                   <Facebook  size={20}/>
//                 </a>
//                 <a href="#" className="text-gray-600 hover:text-pink-500 transition">
//                   <Instagram  size={20}/>
//                 </a>
//                 <a href="#" className="text-gray-600 hover:text-blue-400 transition">
//                   <Twitter  size={20}/>
//                 </a>
//               </div>
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">ساعات کاری</h2>
//               <p className="text-gray-600 mt-2">شنبه تا پنج‌شنبه: 8 صبح تا 4 عصر</p>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <form className="space-y-6 w-full lg:w-1/2 p-6 rounded-lg">
//             <div className="flex flex-col lg:flex-row lg:gap-3">
//               <div className="w-full lg:w-1/2">
//                 <label htmlFor="name" className="block text-gray-700 font-medium">نام</label>
//                 <Input
//                   id="name"
//                   placeholder="نام شما"
//                   className="mt-1 border-gray-300 focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="w-full lg:w-1/2">
//                 <label htmlFor="email" className="block text-gray-700 font-medium">ایمیل</label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="ایمیل شما"
//                   className="mt-1 border-gray-300 focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="message" className="block text-gray-700 font-medium">پیام</label>
//               <Textarea
//                 id="message"
//                 placeholder="پیام خود را اینجا بنویسید"
//                 className="mt-1 border-gray-300 focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-blue-600 text-white font-semibold py-2 hover:bg-blue-700 transition-all"
//             >
//               ارسال پیام
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Contact;

import { Mail, Phone, MapPin, Clock } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const socialLinks = [
  { name: "فیسبوک", href: "#", icon: Facebook },
  { name: "توییتر", href: "#", icon: Twitter },
  { name: "اینستاگرام", href: "#", icon: Instagram },
  { name: "لینکدین", href: "#", icon: Linkedin },
];

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">تماس با ما</h1>
        <p className="text-muted-foreground max-w-2xl">
          سوالی درباره خدمات کتابخانه دیجیتال ما دارید؟ ما اینجا هستیم تا به شما
          کمک کنیم. با تیم ما برای کمک در زمینه تحقیق، منابع یا پشتیبانی فنی
          تماس بگیرید.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" color="blue" />
              ایمیل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-1">کتابخانه</p>
            <p className="font-medium">library@university.ir</p>
            <p className="text-muted-foreground mt-3 mb-1">معاونیت تحقیقات</p>
            <p className="font-medium">support@university.ir</p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" color="blue" />
              تماس تلفنی
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-1">شماره اصلی</p>
            <p className="font-medium">۰۲۱-۱۲۳۴۵۶۷۸</p>
            <p className="text-muted-foreground mt-3 mb-1">معاونیت تحقیقات</p>
            <p className="font-medium">۰۲۱-۱۲۳۴۵۶۷۹</p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" color="blue" />
              ساعات کاری
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-1">جریان هفته</p>
            <p className="font-medium">شنبه تا چهارشنبه: ۸ صبح تا ۴ عصر</p>
            <p className="text-muted-foreground mt-3 mb-1">پشتیبانی آخر هفته</p>
            <p className="font-medium">پنجشنبه : ۸ صبح تا ۱ عصر</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-2xl font-bold mb-6">ارسال پیام</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  نام و نام خانوادگی
                </label>
                <Input id="name" placeholder="نام شما" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  آدرس ایمیل
                </label>
                <Input id="email" type="email" placeholder="ایمیل شما" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                موضوع
              </label>
              <Input
                id="subject"
                placeholder="چگونه می‌توانیم به شما کمک کنیم؟"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                پیام
              </label>
              <Textarea
                id="message"
                placeholder="لطفاً جزئیات درخواست خود را شرح دهید..."
                rows={5}
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              ارسال پیام
            </Button>
          </form>
        </div>

        <div className="space-y-6">
          <div>
            {/* <h2 className="text-2xl font-bold mb-6">ازدید از پردیس اصلی</h2> */}
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="h-5 w-5 text-primary mt-0.5" color="blue" />
              <div>
                <p className="font-medium">کتابخانه  پوهنتون پولیتخنیک</p>
                <p className="text-muted-foreground">
                  کارته مامورین، پوهنتون پولی تخنیک 
                </p>
                <p className="text-muted-foreground">کابل، افغانستان</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-4 w-24 h-24 bg-primary/10 rounded-lg"></div>
            <div className="absolute -bottom-6 -right-4 w-24 h-24 bg-primary/10 rounded-lg"></div>
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-xl">
              <img
                src="/1.jpg"
                alt="کتابخانه دیجیتال دانشگاه"
                className="object-cover h-full w-full"
              />
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-3">
              با ما در ارتباط باشید
            </h3>
            <div className="flex gap-4">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  className="w-10 h-10 rounded-full bg-gray-100 text-blue-600 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
